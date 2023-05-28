package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("WebApp-FoodBlog.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&Post{},
		&LikePost{},
		&CommentPost{},
		&EmotionalComment{},
		&EmotionalList{},
	)

	db = database

	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	// Data::User
	user01 := User{
		Email:    "cherry.chadchada@gmail.com",
		Username: "Cherry Chadchada",
		Password: string(password),
		Image:    "",
	}
	user02 := User{
		Email:    "example.example@example.com",
		Username: "example example",
		Password: string(password),
		Image:    "",
	}
	user03 := User{
		Email:    "test.test@test.com",
		Username: "test test",
		Password: string(password),
		Image:    "",
	}
	db.Model(&User{}).Create(&user01)
	db.Model(&User{}).Create(&user02)
	db.Model(&User{}).Create(&user03)

	// Data::Post
	post01 := Post{
		Title:     "Yakiniku Like",
		Subject:   "ปิ้งย่างคนโสด มีเตาส่วนตัวด้วย! Yakiniku Like เปิดใหม่ที่เซ็นลาด ร้านนี้ดังที่ญี่ปุ่นมากๆ เพราะราคาไม่แพง เป็นเนื้อย่างงบประหยัด แต่คุณภาพดีงาม ที่สำคัญเตาไร้ควัน กินแล้วหัวไม่เหม็นจ้าา ราคาเริ่มต้นเซ็ตละ 169 net ไม่มี++ อย่างเลิศ",
		Image:     "",
		Create_at: time.Date(2023, 1, 1, 10, 10, 10, 0, time.Local),
		Author:    user01,
	}
	post02 := Post{
		Title:     "Cast Iron",
		Subject:   "กลับมาแล้ววว เมนูที่ปีนึงมีครั้ง😍 เบอร์เกอร์ทรัฟเฟิลร้าน Cast Iron ตรงอารีย์ เราชอบเบอร์เกอร์ร้านนี้มากๆ กินบ่อยสุดๆ เมนูนี้เป็น Brie Truffle Burger ขูดทรัฟเฟิลสดๆลงไปจุกๆ ชีสก็เป็นรสทรัฟเฟิลนะ อร่อยยจิงจัง😋",
		Image:     "",
		Create_at: time.Date(2023, 3, 11, 12, 13, 14, 0, time.Local),
		Author:    user02,
	}
	post03 := Post{
		Title:     "น้ำแข็งไสสไตล์ญี่ปุ่น",
		Subject:   "น้ำแข็งไสสไตล์ญี่ปุ่น เปิดสาขาใหม่สามย่านมิตรทาวน์ คิวยาวมากก น้ำแข็งเค้าเนียนนุ่มเกล็ดเป็นปุยๆดีจริง แถมราคาไม่แพง เริ่มต้นแค่ 49.- ชอบรสชาไทย มีบุกกรุบๆวิปครีม รสบับเบิ้ลกัมก็ดี คิดถีงตอนเด็กๆ",
		Image:     "",
		Create_at: time.Now(),
		Author:    user03,
	}
	db.Model(&Post{}).Create(&post01)
	db.Model(&Post{}).Create(&post02)
	db.Model(&Post{}).Create(&post03)

	// Data::LikePost
	like01 := LikePost{
		Post:     post01,
		UserLike: user01,
	}
	like02 := LikePost{
		Post:     post01,
		UserLike: user02,
	}
	like03 := LikePost{
		Post:     post02,
		UserLike: user01,
	}
	like04 := LikePost{
		Post:     post02,
		UserLike: user02,
	}
	like05 := LikePost{
		Post:     post02,
		UserLike: user03,
	}
	like06 := LikePost{
		Post:     post03,
		UserLike: user01,
	}
	db.Model(&LikePost{}).Create(&like01)
	db.Model(&LikePost{}).Create(&like02)
	db.Model(&LikePost{}).Create(&like03)
	db.Model(&LikePost{}).Create(&like04)
	db.Model(&LikePost{}).Create(&like05)
	db.Model(&LikePost{}).Create(&like06)

	// Data::CommentPost
	comment01 := CommentPost{
		Comment:     "น่าทานมากๆ",
		Create_at:   time.Now(),
		Post:        post01,
		UserComment: user02,
	}
	comment02 := CommentPost{
		Comment:     "น่าอร่อยจัง",
		Create_at:   time.Now(),
		Post:        post02,
		UserComment: user01,
	}
	comment03 := CommentPost{
		Comment:     "อยากไปบ้างจัง",
		Create_at:   time.Now(),
		Post:        post02,
		UserComment: user03,
	}
	db.Model(&CommentPost{}).Create(&comment01)
	db.Model(&CommentPost{}).Create(&comment02)
	db.Model(&CommentPost{}).Create(&comment03)

	// Data::EmotionalList - ไม่รองรับการเพิ่มข้อมูล EmotionalList
	emote01 := EmotionalList{
		Name: "normal",
	}
	emote02 := EmotionalList{
		Name: "smile",
	}
	emote03 := EmotionalList{
		Name: "very",
	}
	db.Model(&EmotionalList{}).Create(&emote01)
	db.Model(&EmotionalList{}).Create(&emote02)
	db.Model(&EmotionalList{}).Create(&emote03)

	// Data::EmotionalComment
	emotecom01 := EmotionalComment{
		EmotionalComment: comment01,
		Emotional:        emote01,
		UserEmotional:    user01,
	}
	emotecom02 := EmotionalComment{
		EmotionalComment: comment01,
		Emotional:        emote02,
		UserEmotional:    user02,
	}
	emotecom03 := EmotionalComment{
		EmotionalComment: comment01,
		Emotional:        emote03,
		UserEmotional:    user03,
	}
	emotecom04 := EmotionalComment{
		EmotionalComment: comment02,
		Emotional:        emote01,
		UserEmotional:    user01,
	}
	emotecom05 := EmotionalComment{
		EmotionalComment: comment02,
		Emotional:        emote01,
		UserEmotional:    user02,
	}
	emotecom06 := EmotionalComment{
		EmotionalComment: comment03,
		Emotional:        emote03,
		UserEmotional:    user01,
	}
	emotecom07 := EmotionalComment{
		EmotionalComment: comment03,
		Emotional:        emote03,
		UserEmotional:    user02,
	}
	emotecom08 := EmotionalComment{
		EmotionalComment: comment03,
		Emotional:        emote03,
		UserEmotional:    user03,
	}
	db.Model(&EmotionalComment{}).Create(&emotecom01)
	db.Model(&EmotionalComment{}).Create(&emotecom02)
	db.Model(&EmotionalComment{}).Create(&emotecom03)
	db.Model(&EmotionalComment{}).Create(&emotecom04)
	db.Model(&EmotionalComment{}).Create(&emotecom05)
	db.Model(&EmotionalComment{}).Create(&emotecom06)
	db.Model(&EmotionalComment{}).Create(&emotecom07)
	db.Model(&EmotionalComment{}).Create(&emotecom08)

}
