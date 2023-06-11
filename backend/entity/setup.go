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
	post04 := Post{
		Title:     "ไข่ขยี้พริกน้ำปลา เมนูไข่อร่อยล้านวิว ทำกินง่าย ๆ รสจัดจ้าน",
		Subject:   `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"    ไข่ขยี้พริกน้ำปลา เมนูไข่สุดฮิตยอดวิวเยอะ ใส่หอมแดงสมุนไพรไทย มีความแซ่บจากพริก กินกับข้าวสวยอิ่มไปอีกมื้อ","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"ตามกระแส","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"ไข่ขยี้พริกน้ำปลา ","type":"text","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"เมนูไข่","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":null,"target":"_blank","title":null,"url":"https://cooking.kapook.com/menu/egg"},{"detail":0,"format":0,"mode":"normal","style":"","text":"สุดฮิต วันนี้อยากให้ลองมาทำสักมื้อ ความอร่อยคือนำไข่ผัดกับ","type":"text","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"น้ำปลาพริก","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":null,"target":"_blank","title":null,"url":"https://cooking.kapook.com/view217189.html"},{"detail":0,"format":0,"mode":"normal","style":"","text":"จนนัวเข้ากัน ได้ทั้งรสชาติหอมฉุนจากหอมแดงและความเผ็ดของพริกสด บอกเลยว่าทำง่ายและอร่อยมาก","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":9,"mode":"normal","style":"","text":"วิธีเลือกไข่ไก่","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"เมนูไข่","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://s359.kapook.com/pagebuilder/ea878ca5-5920-4648-a531-b266736424ee.jpg","type":"image","version":1,"width":0}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เลือกไข่ใหม่ โดยสังเกตว่าจะมีผงแป้งสีขาวติดอยู่หรือมีผิวขรุขระ ถ้าเนียนเรียบลื่นและเงาแสดงว่าเป็นไข่เก่า","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เลือกเปลือกไข่ที่สะอาด เพราะหากมีรอยแตกร้าวอาจมีสิ่งปนเปื้อนเข้าไปได้","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เลือกไข่ที่มีลักษณะกลม เนื่องจากมีปริมาณเนื้อไข่ขาวมากกว่าไข่รูปทรงรี ส่วนปริมาณไข่แดงพอ ๆ กันทั้งสองรูปทรง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เขย่าไข่ โดยถ้าเป็นไข่ใหม่ เวลาเขย่าเนื้อภายในจะยังแน่นและติดอยู่ที่เปลือก ไม่สั่นคลอน ถ้าเป็นไข่เก่า เวลาเขย่าจะมีการสั่นหรือเคลื่อนไหว","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"แช่น้ำทดสอบ โดยถ้าเป็นไข่ใหม่จะจมน้ำ ไข่เก่าจะลอยใต้ผิวน้ำ ส่วนไข่เน่าจะลอยเหนือน้ำ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":5}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"สูตรไข่ขยี้พริกน้ำปลา","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h2"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"altText":"เมนูไข่","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://s359.kapook.com/pagebuilder/41030878-f69e-4746-9578-4b8cc7a8a4c8.jpg","type":"image","version":1,"width":0},{"detail":0,"format":0,"mode":"normal","style":"","text":"ภาพจาก : คุณหมีซี้ด สมาชิกเว็บไซต์พันทิปดอทคอม","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"แชร์เมนูเด็ดไข่ขยี้พริกน้ำปลา เมนูฮิตล้านวิวอร่อยมาก รู้งี้ทำนานแล้ว มาดูกันครับ","type":"text","version":1},{"type":"linebreak","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"โดย คุณหมีซี้ด สมาชิกเว็บไซต์พันทิปดอทคอม","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"     สวัสดีครับ ผมเห็นคนฮิตทำเมนูไข่ขยี้พริกน้ำปลากัน มีคนดูเป็นล้านวิวเลยเพราะมันอร่อย ผมเลยอยากมาแชร์สูตรไข่ขยี้พริกน้ำปลาแบบบ้าน ๆ ของผม","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ส่วนผสม ไข่ขยี้พริกน้ำปลา","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h3"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ไข่ไก่","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"กระเทียมหั่นบาง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"พริกซอย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"หอมแดงซอย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"น้ำปลา","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":5},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"น้ำมันพืช","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":6}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"วิธีทำไข่ขยี้พริกน้ำปลา","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h3"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"นำพริก กระเทียม และหอมแดง ไปล้างทำความสะอาด แล้วนำมาใส่ชามผสม","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"จากนั้นตอกไข่ใส่ลงไป ปรุงรสด้วยน้ำปลา ตีให้เข้ากัน","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ตั้งกระทะใส่น้ำมันลงไปเล็กน้อย แล้วเทไข่ลงไปทอด ขยี้ไปมาจนไข่เซตตัว ตักเสิร์ฟ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"altText":"เมนูไข่","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://s359.kapook.com/pagebuilder/f17c88ce-4302-4964-b3d5-ea26431d1dfa.jpg","type":"image","version":1,"width":0},{"detail":0,"format":0,"mode":"normal","style":"","text":"ภาพจาก : คุณหมีซี้ด สมาชิกเว็บไซต์พันทิปดอทคอม","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"สูตรน้ำปลาพริก","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h3"},{"children":[{"altText":"เมนูไข่","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://s359.kapook.com/pagebuilder/b28e04b3-3d3a-471c-998d-2ecc3551e18e.jpg","type":"image","version":1,"width":0}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"ส่วนผสม น้ำปลาพริก","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"น้ำปลา","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"พริกสด","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"น้ำมะนาว","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"หอมแดง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"วิธีทำน้ำปลาพริก","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h3"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"นำส่วนผสมทุกอย่างใส่ถ้วย คนผสมให้เข้ากัน","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"},{"children":[],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"     จบไปแล้วสำหรับวิธีทำไข่ขยี้พริกน้ำปลา ","type":"text","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"อาหารไทย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"link","version":1,"rel":null,"target":"_blank","title":null,"url":"https://cooking.kapook.com/international/thai"},{"detail":0,"format":1,"mode":"normal","style":"","text":" สามารถปรับความเผ็ดได้ตามชอบ โรยต้นหอมเพิ่มสีสันให้ดูสวยงามน่ากินมากขึ้น","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		Preview:   "    ไข่ขยี้พริกน้ำปลา เมนูไข่สุดฮิตยอดวิวเยอะ ใส่หอมแดงสมุนไพรไทย มีความแซ่บจากพริก กินกับข้าวสวยอิ่มไปอีกมื้อตามกระแสไข่ขยี้พริกน้ำปลา สุดฮิต วันนี้อยากให้ลองมาทำสักมื้อ ความอร่อยคือนำไข่ผัดกับจนนัวเข้ากัน ได้ทั้งรสชาติหอมฉุนจากหอมแดงและความเผ็ดของพริกสด บอกเลยว่าทำง่ายและอร่อยมาก  วิธีเลือกไข่ไก่                         ",
		Create_at: time.Now(),
		Author:    user01,
		Category:  category02,
	}
	post05 := Post{
		Title:     "รับสมัครพนักงานร้าน \"อร่อยดี\"",
		Subject:   `{"root":{"children":[{"children":[{"altText":"URL image","caption":{"editorState":{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}},"height":0,"maxWidth":500,"showCaption":false,"src":"https://happyschoolbreak.com/wp-content/uploads/2020/07/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AD%E0%B8%A3%E0%B9%88%E0%B8%AD%E0%B8%A2%E0%B8%94%E0%B8%B5.jpg","type":"image","version":1,"width":0}],"direction":null,"format":"center","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`,
		Preview:   "",
		Create_at: time.Now(),
		Author:    user02,
		Category:  category03,
	}
	post06 := Post{
		Title:     "50 สโลแกน แคปชั่นขายของกิน เรียกยอดขาย หยิบโพสได้ทุกวัน",
		Subject:   `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"รวมมาแล้วสำหรับ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"แคปชั่นอาหาร","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"แคปชั่นกิน","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"แคปชั่นขายของกิน แคปชั่นขายของกินออนไลน์","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" จะไปร้านอาหาร ร้านคาเฟ่ หยิบมาโพสเรียกยอดไลก์ ยอดแชร์ กับเพื่อนๆ กันได้เลย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"สโลแกน แคปชั่นขายของกิน ฮาๆ กวนๆ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h3"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อร่อยครบรส เพราะชูรสครึ่งซอง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ความเค็มกลมกล่อม การันตีด้วยโรคไต","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อร่อยหวานมัน จนเบาหวานถามหา","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"กรอบนอก เหนียวใน นุ่มนาน ต้องจานนี้เลย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"รสชาติร้านเราไม่สองมาตรฐาน เพราะเราไม่มีมาตรฐาน","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":5},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เพราะความอร่อยของเราไม่เท่ากัน","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":6},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ใส่ใจได้แค่มอง อยากลองก็มาชิม","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":7},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ขาดทุนไม่ว่า เสียหน้าไม่ได้","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":8},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ความอร่อยไม่ซ้ำใคร เพราะจำสูตรไม่ได้","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":9},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อร่อยตัวแตก เพื่อนต้องแบกกลับบ้าน","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":10},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อร่อยแซ่บจนลำไส้ร้องขอชีวิต","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":11},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ชีวิตเกิดมาเพื่อ ..... กินของอร่อย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":12},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ขายหมดทุกวัน เพราะทำน้อย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":13},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"พ่อค้าแซ่บไม่สู้ เมนูทะเลเดือด","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":14},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อาหารอร่อยเพราะเราคู่กัน \"น้ำปลากับชูรส\"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":15},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อาหารอร่อย ท้าให้ลอง การันตีจากหุ่นคนขาย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":16},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อร่อยทุกคำ เพราะทำด้วยใจ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":17},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ขนมปังหอม นุ่ม ชุ่มคอยิ่งกว่าลูกอมแฮ็คส์","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":18},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เพราะลูกค้าคือคนสำคัญ เราจึงคัดสรรวัตถุดิบชั้นดี","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":19},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"สั่งแก้วเดียวไม่เคยพอ เพราะนั่งรอเธอนานหลายชั่วโมง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":20},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"สั่งอาหารร้านเรา รับประกันความหอมทะลุโซเชี่ยว","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":21},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"น้ำซุปเข้มข้น ลูกชิ้นเด้ง ยิ่งกว่าตูดเด็กอีกนะคะ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":22},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ข้าวสวยร้อนๆ มาได้ที่นี่ (เพราะอุ่นตลอด)","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":23},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เพื่อให้ลูกค้าไม่จำเจ ร้านเราคิดค้นสูตรใหม่ทุกวัน (เพราะจำสูตรเก่าไม่ได้)","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":24},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ของอร่อยมาที่นี่ เพราะมีชูรส ทุกยี่ห้อ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":25},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"แม่ค้าใจดี แถมฟรี พริกน้ำปลา ไม่อั้น","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"สโลแกน แคปชั่นเปิดร้านคาเฟ่","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":26},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"น้ำท่วมแล้ว แว๊ะมาดื่มกาแฟซักแก้วแล้วค่อยลุยน้ำต่อ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":27},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ร้านนี้มีดีที่กาแฟเข้ม แต่พ่อค้าอ่อนหวาน","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":28},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ตื่นเช้าง่วงมั้ย กาแฟใส่นม ซักแก้ว","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":29},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เมื่อรู้สึกเหงา แวะมานั่งชิลที่คาเฟ่เรานะคะ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":30},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"คาเฟ่เปิดแล้ว","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"แคปชั่นไปร้านคาเฟ่ ร้านกาแฟ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":31},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ตื่นมาเพื่อดื่มกาแฟ ไม่ได้ดื่มกาแฟเพื่อตื่น","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":32},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"คาปูชิโน่ไร้ฟองนม ก็เหมือนผมไร้เธอเคียงข้าง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":33},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"กาแฟเป็นหลัก งานเป็นรอง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":34},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"มาคาเฟ่ทั้งที ต้องสายตาดี เผื่อเจอคนข้างกาย","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":35},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"วันนี้เราอาจจะเย็นชา เพราะเราสั่งกาแฟ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":36},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เธอเป็นเหมือนกาแฟ ที่เราต้องกินทุกเช้า","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":37},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ดื่มกาแฟซักแก้วให้ตาสว่าง จะได้มองโลกให้ได้กว้างกว่าเดิม","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":38},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"กาแฟไม่ใส่น้ำตาลยังไม่ขมเท่าเธอไม่ใส่ใจ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":39},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"คาปูชิโน่ที่ไร้ฟองก็เหมือนแววตาเธอที่ไม่มองมาทางนี้","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":40},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"อยากกินกาแฟ ต้องบอกบาริสต้า อยากเป็นแฟนเธอ จะบอกใครได้","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"แคปชั่นไปร้านอาหาร","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":41},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"โลกนี้อยู่ยาก แต่ถ้ามีปิ้งย่างก็อยู่ได้","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":42},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"วันนี้กินมัง กินมังทุกอย่างที่ขวางหน้า","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":43},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เรื่องกินขอให้บอก ไม่มีหรอกคำว่าเลี้ยง","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":44},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เป็นคนกินง่าย แต่จ่ายยาก","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":45},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ถ้าใจเราผอม ปิ้งย่างหอมๆ ก็แค่ผักลวก","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":46},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ก๋วยเตี๋ยวต้องปรุง ถ้าอยากได้แฟนมีพุงก็ต้องเป็นแฟนเรา","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":47},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ไข่พะโล้ สีดำปี๋ แต่คนทำขาวโบ๊ะ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":48},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"แซ่บกว่าผัดกระเพรา ก็ต้องเรานี่แหละ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":49},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"กินให้สุดหยุดที่แอดมิท","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":50}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		Preview:   "รวมมาแล้วสำหรับแคปชั่นอาหาร แคปชั่นกิน แคปชั่นขายของกิน แคปชั่นขายของกินออนไลน์ จะไปร้านอาหาร ร้านคาเฟ่ หยิบมาโพสเรียกยอดไลก์ ยอดแชร์ กับเพื่อนๆ กันได้เลย สโลแกน แคปชั่นขายของกิน ฮาๆ กวนๆ  ",
		Create_at: time.Now(),
		Author:    user03,
		Category:  category04,
	}
	post07 := Post{
		Title:     "การใช้งานกระทะที่ถูกวิธี?",
		Subject:   `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"สวัสดีครับ พอจะมีพี่ๆคนไหนช่วยแนะนำการใช้งานกระทะให้ผมได้บ้างครับ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"ผมเคยได้ยินมาว่าต้องเผากระทะก่อน","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"เราจำเป็นต้องทำแบบนั้นไหมครับ แล้วการทำแบบนั้นมัน","type":"text","version":1},{"detail":0,"format":8,"mode":"normal","style":"","text":"ต้องทำยังไง","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"หรือเรียกว่า","type":"text","version":1},{"detail":0,"format":8,"mode":"normal","style":"","text":"วิธีการ","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"อะไรครับ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":2,"mode":"normal","style":"","text":"ขอบคุณครับ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		Preview:   "สวัสดีครับ พอจะมีพี่ๆคนไหนช่วยแนะนำการใช้งานกระทะให้ผมได้บ้างครับ  ผมเคยได้ยินมาว่าต้องเผากระทะก่อน เราจำเป็นต้องทำแบบนั้นไหมครับ แล้วการทำแบบนั้นมันต้องทำยังไงหรือเรียกว่าวิธีการอะไรครับ  ขอบคุณครับ ",
		Create_at: time.Now(),
		Author:    user02,
		Category:  category05,
	}
	db.Model(&Post{}).Create(&post01)
	db.Model(&Post{}).Create(&post02)
	db.Model(&Post{}).Create(&post03)
	db.Model(&Post{}).Create(&post04)
	db.Model(&Post{}).Create(&post05)
	db.Model(&Post{}).Create(&post06)
	db.Model(&Post{}).Create(&post07)

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
