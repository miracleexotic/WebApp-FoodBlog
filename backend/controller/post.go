package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/WebApp-FoodBlog/entity"
)

type PostWithLikeCount struct {
	Post  entity.Post
	Count int64
}

// GET /posts
// -- List all posts.
func ListPosts(c *gin.Context) {
	var posts []entity.Post

	if err := entity.DB().
		Preload("Author").
		Preload("Category").
		Order("create_at desc").
		Find(&posts).Error; err != nil {
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
	if err := entity.DB().Model(&entity.User{}).
		Where("email = ?", user_email).
		First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var posts []entity.Post
	if err := entity.DB().
		Preload("Author").
		Preload("Category").
		Order("create_at desc").
		Where("author_id = ?", user.ID).
		Find(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": posts})
}

// GET /posts/category/:id
// -- List all post in category with like count.
func ListPostByCategoryWithLikeCount(c *gin.Context) {
	id := c.Param("id")
	var posts []entity.Post

	if err := entity.DB().
		Preload("Author").
		Preload("Category").
		Order("create_at desc").
		Where("category_id = ?", id).
		Find(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var posts_likeCount []PostWithLikeCount

	for i := 0; i < len(posts); i++ {
		var count int64
		if err := entity.DB().Model(&entity.LikePost{}).Where("post_id = ?", posts[i].ID).Count(&count).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		posts_likeCount = append(posts_likeCount, PostWithLikeCount{Post: posts[i], Count: count})
	}

	c.JSON(http.StatusOK, gin.H{"data": posts_likeCount})
}

// GET /posts/like/count
// -- List all post with like count.
func ListPostWithLikeCount(c *gin.Context) {
	var posts []entity.Post

	if err := entity.DB().
		Preload("Author").
		Preload("Category").
		Order("create_at desc").
		Find(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var posts_likeCount []PostWithLikeCount

	for i := 0; i < len(posts); i++ {
		var count int64
		if err := entity.DB().Model(&entity.LikePost{}).Where("post_id = ?", posts[i].ID).Count(&count).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		posts_likeCount = append(posts_likeCount, PostWithLikeCount{Post: posts[i], Count: count})
	}

	c.JSON(http.StatusOK, gin.H{"data": posts_likeCount})
}

// GET /posts/like/count/active
// -- List all post with like count.
func ListPostWithLikeCountActiveUser(c *gin.Context) {
	user_email, _ := c.Get("email")
	var user entity.User
	if err := entity.DB().Model(&entity.User{}).
		Where("email = ?", user_email).
		First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var posts []entity.Post

	if err := entity.DB().
		Preload("Author").
		Preload("Category").
		Order("create_at desc").
		Where("author_id = ?", user.ID).
		Find(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var posts_likeCount []PostWithLikeCount

	for i := 0; i < len(posts); i++ {
		var count int64
		if err := entity.DB().Model(&entity.LikePost{}).Where("post_id = ?", posts[i].ID).Count(&count).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		posts_likeCount = append(posts_likeCount, PostWithLikeCount{Post: posts[i], Count: count})
	}

	c.JSON(http.StatusOK, gin.H{"data": posts_likeCount})
}

// GET /post/:id
// -- Specific post with id.
func GetPost(c *gin.Context) {
	id := c.Param("id")
	var post entity.Post

	if err := entity.DB().
		Preload("Author").
		Preload("Category").
		Order("create_at desc").
		Where("id = ?", id).
		Find(&post).Error; err != nil {
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
	if err := entity.DB().Model(&entity.User{}).
		Where("email = ?", user_email).
		First(&user).Error; err != nil {
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

	if err := entity.DB().
		Where("id = ?", id).
		Delete(&entity.Post{}).Error; err != nil {
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

	post.CategoryID = &post.Category.ID

	if err := entity.DB().Model(&entity.Post{}).
		Where("id = ?", id).
		Updates(post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": post})
}

// j, _ := json.MarshalIndent(user, "", "    ")
// fmt.Println(string(j))
