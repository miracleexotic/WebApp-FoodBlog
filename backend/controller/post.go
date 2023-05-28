package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/WebApp-FoodBlog/entity"
)

// GET /posts
// -- List all posts.
func ListPosts(c *gin.Context) {
	var posts []entity.Post

	if err := entity.DB().Preload("Author").Order("create_at desc").Find(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": posts})
}

// GET /posts/active
// -- List all posts with active user.
func ListPostsActiveUser(c *gin.Context) {
	user_email, _ := c.Get("email")
	var user entity.User
	if err := entity.DB().Model(&entity.User{}).Where("email = ?", user_email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var posts []entity.Post
	if err := entity.DB().Preload("Author").Order("create_at desc").Where("author_id = ?", user.ID).Find(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": posts})
}

// GET /post/:id
// -- Specific post with id.
func GetPost(c *gin.Context) {
	id := c.Param("id")
	var post entity.Post

	if err := entity.DB().Preload("Author").Order("create_at desc").Where("id = ?", id).Find(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": post})
}

// POST /post
// -- Create new post.
func CreatePost(c *gin.Context) {
	user_email, _ := c.Get("email")
	var user entity.User
	if err := entity.DB().Model(&entity.User{}).Where("email = ?", user_email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var post entity.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post.Create_at = time.Now()
	post.Author = user

	if err := entity.DB().Model(&entity.Post{}).Create(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": post})
}

// DELETE /post/:id
// -- Delete post by id.
func DeletePost(c *gin.Context) {
	id := c.Param("id")

	if err := entity.DB().Where("id = ?", id).Delete(&entity.Post{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /post/:id
// Update post with id.
func UpdatePost(c *gin.Context) {
	id := c.Param("id")

	var post entity.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Model(&entity.Post{}).Where("id = ?", id).Updates(post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": post})
}

// j, _ := json.MarshalIndent(user, "", "    ")
// fmt.Println(string(j))
