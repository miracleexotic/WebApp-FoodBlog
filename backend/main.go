package main

import (
	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/WebApp-FoodBlog/controller"
	"github.com/miracleexotic/WebApp-FoodBlog/entity"
	"github.com/miracleexotic/WebApp-FoodBlog/middlewares"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	apiVer := "/api/v1"

	api := r.Group(apiVer)
	{
		unprotected := api.Use((CORSMiddleware()))
		{
			// Route::Sign Up
			unprotected.POST("/signup", controller.SignUp)

			// Route::Sign In - Authentication
			unprotected.POST("/signin", controller.SignIn)
		}

		protected := api.Use(middlewares.Authorizes())
		{
			// Route::User
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/user/:id", controller.UpdateUser)

			// Route::Post
			protected.GET("/posts", controller.ListPosts)
			protected.GET("/post/:id", controller.GetPost)
			protected.GET("/posts/active", controller.ListPostsActiveUser)
			protected.DELETE("/post/:id", controller.DeletePost)
			protected.POST("/post", controller.CreatePost)
			protected.PATCH("/post/:id", controller.UpdatePost)

			// Route::LikePost
			protected.GET("/like/post/:id", controller.GetLikePost)
			protected.GET("/like/user/:userID/post/:postID", controller.GetUserLikePost)
			protected.PATCH("/like/user/:userID/post/:postID", controller.ToggleLikePost)

			// Route::CommentPost
			protected.GET("/comment/post/:id", controller.ListCommentPost)
			protected.POST("/comment/post/:id", controller.CreateCommentPost)

			// Route::EmotionalList

			// Route::EmotionalComment
			protected.GET("/emotion/comment/:id", controller.GetEmotionalComment)
			protected.GET("/emotion/comment/:id/active", controller.GetEmotionalUserComment)
			protected.PATCH("/emotion/comment/:id/active", controller.ToggleEmotionalComment)

		}
	}

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
