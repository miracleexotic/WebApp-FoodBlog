package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/WebApp-FoodBlog/entity"
	"golang.org/x/crypto/bcrypt"
)

// GET /users
// -- List all users.
func ListUsers(c *gin.Context) {

}

// GET /user/:id
// -- Specific user with id.
func GetUser(c *gin.Context) {
	id := c.Param("id")
	var user entity.User

	if err := entity.DB().First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// POST /user
// -- Create new user or Sign Up.
func SignUp(c *gin.Context) {
	var user entity.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	user.Password = string(bytes)

	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// PATCH /user/:id
// Update user metadata with id.
func UpdateUser(c *gin.Context) {
	email, _ := c.Get("email")

	type payload struct {
		User        entity.User
		NewPassword string
	}

	var data payload
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user entity.User
	if err := entity.DB().Model(entity.User{}).Where("email = ?", email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	if data.User.Password != "" {
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.User.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user old credentials"})
			return
		}

		newPassword, _ := bcrypt.GenerateFromPassword([]byte(data.NewPassword), 14)
		data.User.Password = string(newPassword)
	}

	if err := entity.DB().Model(entity.User{}).Where("email = ?", email).Updates(&data.User).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// j, _ := json.MarshalIndent(data.User, "", "    ")
// fmt.Println(string(j))
