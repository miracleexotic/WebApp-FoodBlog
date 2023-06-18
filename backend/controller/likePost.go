package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/WebApp-FoodBlog/entity"
)

// GET /like/post/:id
// -- Get like by post id.
func GetLikePost(c *gin.Context) {
	id := c.Param("id")
	var likePost []entity.LikePost

	if err := entity.DB().Preload("Post").Preload("UserLike").Where("post_id = ?", id).Find(&likePost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": likePost})
}

// GET /like/user/:userID/post/:postID
// -- Get user that like this post.
func GetUserLikePost(c *gin.Context) {
	user_id := c.Param("userID")
	post_id := c.Param("postID")
	var likePost entity.LikePost

	if err := entity.DB().Preload("Post").Preload("UserLike").Where("user_like_id = ? and post_id = ?", user_id, post_id).First(&likePost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": likePost})
}

// GET /like/user/:userID
// -- Like user that like all post.
func ListUserLikePosts(c *gin.Context) {
	user_id := c.Param("userID")
	var likePosts []entity.LikePost

	if err := entity.DB().
		Preload("Post").
		Preload("Post.Author").
		Preload("Post.Category").
		Preload("UserLike").
		Order("created_at desc").
		Where("user_like_id = ?", user_id).
		Find(&likePosts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": likePosts})
}

// PATCH /like/user/:userID/post/:postID
// -- Toggle user like with post
func ToggleLikePost(c *gin.Context) {
	user_id := c.Param("userID")
	post_id := c.Param("postID")

	var user entity.User
	if err := entity.DB().Model(&entity.User{}).Where("id = ?", user_id).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var post entity.Post
	if err := entity.DB().Model(&entity.Post{}).Where("id = ?", post_id).Find(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	likePost := entity.LikePost{
		Post:     post,
		UserLike: user,
	}
	if err := entity.DB().Preload("Post").Preload("UserLike").Where("user_like_id = ? and post_id = ?", user_id, post_id).First(&likePost).Error; err != nil {
		// Create - บันทึกการกดไลค์
		if err := entity.DB().Model(&entity.LikePost{}).Create(&likePost).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": likePost})
		return
	}

	// Delete - กดซ้ำลบออก
	if err := entity.DB().Model(&entity.LikePost{}).Delete(&likePost).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": likePost})
}

// j, _ := json.MarshalIndent(user, "", "    ")
// fmt.Println(string(j))
