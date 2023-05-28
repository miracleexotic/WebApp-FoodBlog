package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/miracleexotic/WebApp-FoodBlog/entity"
)

// GET /emotion/comment/:id
// -- Get emotional by comment
func GetEmotionalComment(c *gin.Context) {
	id := c.Param("id")

	type DataResponse struct {
		Normal int
		Smile  int
		Very   int
	}

	var emotions_n []entity.EmotionalComment
	if err := entity.DB().Model(&entity.EmotionalComment{}).Where("emotional_comment_id = ? and emotional_id = 1", id).Find(&emotions_n).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var emotions_s []entity.EmotionalComment
	if err := entity.DB().Model(&entity.EmotionalComment{}).Where("emotional_comment_id = ? and emotional_id = 2", id).Find(&emotions_s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var emotions_v []entity.EmotionalComment
	if err := entity.DB().Model(&entity.EmotionalComment{}).Where("emotional_comment_id = ? and emotional_id = 3", id).Find(&emotions_v).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := &DataResponse{
		Normal: len(emotions_n),
		Smile:  len(emotions_s),
		Very:   len(emotions_v),
	}

	c.JSON(http.StatusOK, gin.H{"data": data})
}

// GET /emotion/comment/:id/active
// -- Get emotional by comment
func GetEmotionalUserComment(c *gin.Context) {
	user_email, _ := c.Get("email")
	id := c.Param("id")

	var emotion entity.EmotionalComment
	if err := entity.DB().Model(&entity.EmotionalComment{}).Preload("Emotional").Joins("UserEmotional").
		Where("emotional_comment_id = ? and UserEmotional__email = ?", id, user_email).Find(&emotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emotion})
}

// PATCH /emotion/comment/:id/active
// -- Toggle emotional with comment
func ToggleEmotionalComment(c *gin.Context) {
	user_email, _ := c.Get("email")
	id := c.Param("id")

	type DataRequest struct {
		Name_prev string
		Name_curr string
	}

	var data DataRequest
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var emote_curr entity.EmotionalList
	if err := entity.DB().Model(&entity.EmotionalList{}).Where("name = ?", data.Name_curr).First(&emote_curr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user entity.User
	if err := entity.DB().Model(&entity.User{}).Where("email = ?", user_email).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var comment entity.CommentPost
	if err := entity.DB().Model(&entity.CommentPost{}).Where("id = ?", id).First(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dataResponse := &entity.EmotionalComment{
		EmotionalComment: comment,
		Emotional:        emote_curr,
		UserEmotional:    user,
	}

	// กรณีที่กด emotion เดิม
	if emote_curr.Name == data.Name_prev {
		var emotion entity.EmotionalComment
		if err := entity.DB().Model(&entity.EmotionalComment{}).Joins("Emotional").
			Where("emotional_comment_id = ? and user_emotional_id = ?", comment.ID, user.ID).Find(&emotion).Error; err != nil {
			// create - ไม่เคยกด emotion ไหนเลย
			if err := entity.DB().Model(&entity.EmotionalComment{}).Create(dataResponse).Error; err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			c.JSON(http.StatusOK, gin.H{"data": dataResponse})
			return
		}
		// delete - เคยกด ลบทิ้ง
		if err := entity.DB().Joins("Emotional").
			Where("emotional_comment_id = ? and user_emotional_id = ?", comment.ID, user.ID).
			Delete(&entity.EmotionalComment{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		c.JSON(http.StatusOK, gin.H{"data": dataResponse})
		return
	}

	// กรณีเคยกด emotion ไว้ แต่เปลี่ยนไปกด emotion อื่น
	var emotion entity.EmotionalComment
	if err := entity.DB().Model(&entity.EmotionalComment{}).Joins("Emotional").
		Where("emotional_comment_id = ? and user_emotional_id = ?", comment.ID, user.ID).Find(&emotion).Error; err != nil {
		// create - ไม่เคยกด emotion ไหนมาก่อนเลย
		if err := entity.DB().Model(&entity.EmotionalComment{}).Create(dataResponse).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": dataResponse})
		return
	}

	// delete - ลบ emotion เก่าออก
	if err := entity.DB().Joins("Emotional").
		Where("emotional_comment_id = ? and user_emotional_id = ?", comment.ID, user.ID).
		Delete(&entity.EmotionalComment{}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create - บันทึก emotion ใหม่
	if err := entity.DB().Model(&entity.EmotionalComment{}).Create(dataResponse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dataResponse})
}

// j, _ := json.MarshalIndent(user, "", "    ")
// fmt.Println(string(j))
