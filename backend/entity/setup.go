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
		Email:     "cherry.chadchada@gmail.com",
		Username:  "Cherry Chadchada",
		Password:  string(password),
		Firstname: "Cherry",
		Lastname:  "Chadchada",
		Birthdate: time.Date(1999, 6, 7, 0, 0, 0, 0, time.Local),
		Career:    "Engineer",
		Image:     "",
	}
	user02 := User{
		Email:     "example.example@example.com",
		Username:  "example example",
		Password:  string(password),
		Firstname: "Example",
		Lastname:  "Example",
		Birthdate: time.Date(2003, 3, 3, 0, 0, 0, 0, time.Local),
		Career:    "Teacher",
		Image:     "",
	}
	user03 := User{
		Email:     "test.test@test.com",
		Username:  "test test",
		Password:  string(password),
		Firstname: "Test",
		Lastname:  "Test",
		Birthdate: time.Date(2000, 1, 1, 0, 0, 0, 0, time.Local),
		Career:    "Tester",
		Image:     "",
	}
	db.Model(&User{}).Create(&user01)
	db.Model(&User{}).Create(&user02)
	db.Model(&User{}).Create(&user03)

	// Data::Category
	category01 := Category{
		Name: "Reviews",
	}
	category02 := Category{
		Name: "Recipes",
	}
	category03 := Category{
		Name: "Jobs",
	}
	category04 := Category{
		Name: "Promote",
	}
	category05 := Category{
		Name: "Ask",
	}
	db.Model(&Category{}).Create(&category01)
	db.Model(&Category{}).Create(&category02)
	db.Model(&Category{}).Create(&category03)
	db.Model(&Category{}).Create(&category04)
	db.Model(&Category{}).Create(&category05)

	// Data::Post
	post01 := Post{
		Title:     "Yakiniku Like",
		Subject:   `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ปิ้งย่างคนโสด มีเตาส่วนตัวด้วย! ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Yakiniku Like","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" เปิดใหม่ที่เซ็นลาด ร้านนี้ดังที่ญี่ปุ่นมากๆ เพราะราคาไม่แพง ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เป็นเนื้อย่างงบประหยัด แต่คุณภาพดีงาม ที่สำคัญเตาไร้ควัน กินแล้วหัวไม่เหม็นจ้าา ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"URL image","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2FBubblesxMakeup%2Fstatus%2F1479841823426183168&psig=AOvVaw0C0GHCLOJA9WOdzim3nAyw&ust=1685974960843000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMCjzKfoqf8CFQAAAAAdAAAAABAE","type":"image","version":1,"width":0},{"altText":"URL image","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://thestandard.co/wp-content/uploads/2021/11/Yakiniku-Like17.jpg","type":"image","version":1,"width":0}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Yakiniku Like","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Open: ตามเวลาศูนย์การค้า","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Address: ชั้น 1 ศูนย์การค้าเซ็นทรัลพลาซา ลาดพร้าว กรุงเทพฯ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Budget: 200-800 บาท","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Contact: –","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Website: ","type":"text","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"https://www.facebook.com/yakinikulike.th","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":null,"target":null,"title":null,"url":"https://www.facebook.com/yakinikulike.th"}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		Preview:   "ปิ้งย่างคนโสด มีเตาส่วนตัวด้วย! Yakiniku Like เปิดใหม่ที่เซ็นลาด ร้านนี้ดังที่ญี่ปุ่นมากๆ เพราะราคาไม่แพง เป็นเนื้อย่างงบประหยัด แต่คุณภาพดีงาม ที่สำคัญเตาไร้ควัน กินแล้วหัวไม่เหม็นจ้าา",
		Create_at: time.Date(2023, 1, 1, 10, 10, 10, 0, time.Local),
		Author:    user01,
		Category:  category01,
	}
	post02 := Post{
		Title:     "Cast Iron",
		Subject:   `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"กลับมาแล้ววว เมนูที่ปีนึงมีครั้ง😍 ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เบอร์เกอร์ทรัฟเฟิลร้าน Cast Iron ตรงอารีย์ ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เราชอบเบอร์เกอร์ร้านนี้มากๆ กินบ่อยสุดๆ ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เมนูนี้เป็น ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Brie Truffle Burger","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" ขูดทรัฟเฟิลสดๆลงไปจุกๆ ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ชีสก็เป็นรสทรัฟเฟิลนะ ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":2,"mode":"normal","style":"","text":"อร่อยยจิงจัง","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"😋","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		Preview:   "กลับมาแล้ววว เมนูที่ปีนึงมีครั้ง😍 เบอร์เกอร์ทรัฟเฟิลร้าน Cast Iron ตรงอารีย์ เราชอบเบอร์เกอร์ร้านนี้มากๆ กินบ่อยสุดๆ เมนูนี้เป็น Brie Truffle Burger ขูดทรัฟเฟิลสดๆลงไปจุกๆ ชีสก็เป็นรสทรัฟเฟิลนะ อร่อยยจิงจัง😋",
		Create_at: time.Date(2023, 3, 11, 12, 13, 14, 0, time.Local),
		Author:    user02,
		Category:  category01,
	}
	post03 := Post{
		Title:     "น้ำแข็งไสสไตล์ญี่ปุ่น",
		Subject:   `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"น้ำแข็งไสสไตล์ญี่ปุ่น ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":2,"mode":"normal","style":"","text":"เปิดสาขาใหม่สามย่านมิตรทาวน์","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"คิวยาวมากก น้ำแข็งเค้าเนียนนุ่มเกล็ดเป็นปุยๆดีจริง ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"แถมราคาไม่แพง เริ่มต้นแค่ ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"49.-","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ชอบรสชาไทย มี","type":"text","version":1},{"detail":0,"format":8,"mode":"normal","style":"","text":"บุกกรุบๆวิปครีม","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" รสบับเบิ้ลกัมก็ดี ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":2,"mode":"normal","style":"","text":"คิดถีงตอนเด็กๆ","type":"text","version":1},{"type":"linebreak","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		Preview:   "น้ำแข็งไสสไตล์ญี่ปุ่น เปิดสาขาใหม่สามย่านมิตรทาวน์ คิวยาวมากก น้ำแข็งเค้าเนียนนุ่มเกล็ดเป็นปุยๆดีจริง แถมราคาไม่แพง เริ่มต้นแค่ 49.- ชอบรสชาไทย มีบุกกรุบๆวิปครีม รสบับเบิ้ลกัมก็ดี คิดถีงตอนเด็กๆ",
		Create_at: time.Now(),
		Author:    user03,
		Category:  category01,
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
