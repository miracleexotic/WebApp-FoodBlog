package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email     string `gorm:"uniqueIndex"`
	Username  string
	Password  string
	Firstname string
	Lastname  string
	Birthdate time.Time
	Career    string
	Image     string

	// 1 user เป็นเจ้าของได้หลาย post
	Posts []Post `gorm:"foreignKey:AuthorID"`

	// 1 user สามารถถูกใจได้หลาย likePost
	Likes []LikePost `gorm:"foreignKey:UserLikeID"`

	// 1 user เป็นเจ้าของได้หลาย comment
	Comments []CommentPost `gorm:"foreignKey:UserCommentID"`

	// 1 user สามารถแสดงความรู้สึกได้หลาย emotionalComment
	EmotionalComments []EmotionalComment `gorm:"foreignKey:UserEmotionalID"`
}

type Post struct {
	gorm.Model
	Title     string
	Preview   string
	Subject   string
	Lat       float64
	Lng       float64
	Create_at time.Time

	// AuthorID ทำหน้าที่เป็น FK
	AuthorID *uint
	Author   User `gorm:"references:id"`

	// CategoryID ทำหน้าที่เป็น FK
	CategoryID *uint
	Category   Category `gorm:"references:id"`

	// 1 post สามารถถูกใจได้หลาย likePost
	Likes []LikePost `gorm:"foreignKey:PostID"`

	// 1 post สามารถคอมเมนต์ได้หลาย commentPost
	Comments []CommentPost `gorm:"foreignKey:PostID"`
}

type Category struct {
	gorm.Model
	Name string

	// 1 category สามารถมีได้หลาย post
	Posts []Post `gorm:"foreignKey:CategoryID"`
}

type LikePost struct {
	gorm.Model

	// PostID ทำหน้าที่เป็น FK
	PostID *uint
	Post   Post `gorm:"references:id"`

	// UserLikeID ทำหน้าที่เป็น FK
	UserLikeID *uint
	UserLike   User `gorm:"references:id"`
}

type CommentPost struct {
	gorm.Model
	Comment   string
	Create_at time.Time

	// PostID ทำหน้าที่เป็น FK
	PostID *uint
	Post   Post `gorm:"references:id"`

	// UserCommentID ทำหน้าที่เป็น FK
	UserCommentID *uint
	UserComment   User `gorm:"references:id"`

	// 1 commentPost สามารถมีได้หลาย emotionalComment
	EmotionalComments []EmotionalComment `gorm:"foreignKey:EmotionalCommentID"`
}

type EmotionalList struct {
	gorm.Model
	Name string

	// 1 emotionalList สามารถอยู่ได้ในหลาย emotionalComment
	EmotionalComments []EmotionalComment `gorm:"foreignKey:EmotionalID"`
}

type EmotionalComment struct {
	gorm.Model

	// EmotionalCommentID ทำหน้าที่เป็น FK
	EmotionalCommentID *uint
	EmotionalComment   CommentPost `gorm:"references:id"`

	// EmotionalID ทำหน้าที่เป็น FK
	EmotionalID *uint
	Emotional   EmotionalList `gorm:"references:id"`

	// UserEmotionalID ทำหน้าที่เป็น FK
	UserEmotionalID *uint
	UserEmotional   User `gorm:"references:id"`
}
