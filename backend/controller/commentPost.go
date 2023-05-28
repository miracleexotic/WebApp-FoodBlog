package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/WebApp-FoodBlog/entity"
)

// GET /comment/post/:id
// -- List all comments by post id.
func ListCommentPost(c *gin.Context) {
	id := c.Param("id")
	var comments []entity.CommentPost

	if err := entity.DB().Preload("Post").Preload("UserComment").Order("create_at desc").Where("post_id = ?", id).Find(&comments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comments})

}

// POST /comment/post/:id
// -- Create comment.
func CreateCommentPost(c *gin.Context) {
	user_email, _ := c.Get("email")
	id := c.Param("id")

	var comment entity.CommentPost
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user entity.User
	if err := entity.DB().Model(&entity.User{}).Where("email = ?", user_email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var post entity.Post
	if err := entity.DB().Model(&entity.Post{}).Where("id = ?", id).First(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	comment.Create_at = time.Now()
	comment.Post = post
	comment.UserComment = user

	if err := entity.DB().Model(&entity.CommentPost{}).Create(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comment})
}

// j, _ := json.MarshalIndent(user, "", "    ")
// fmt.Println(string(j))
