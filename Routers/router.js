const express = require('express')

const adminController = require('../controllers/adminController')

const teacherController = require('../controllers/teacherController')

const classController = require('../controllers/classController')

const studentController = require('../controllers/studentController')

const jwtMiddleware = require('../MiddleWare/jwtMiddleware')

const multerConfig = require('../MiddleWare/multerMiddleware')

const router = new express.Router()

//1) Admin Register
router.post('/admin/register',adminController.register)

//2) Admin Login
router.post('/admin/login',adminController.login)

//3) Teacher Register
router.post('/teachers/register',jwtMiddleware,multerConfig.single('teacherImage'),teacherController.registerteacher)

//4) All Teacher View
router.get('/teachers/all-teachers',jwtMiddleware,teacherController.getallTeachers)

//5) Add class
router.post('/classes/add-classes',jwtMiddleware,classController.addclass)

//6) All Class View
router.get('/classes/all-classes',jwtMiddleware,classController.getallClass)

//7) Student Register
router.post('/students/register',jwtMiddleware,multerConfig.single('studentImage'),studentController.registerStudent)

//8) All Students view
router.get('/students/all-students',jwtMiddleware,studentController.getallStudents)

//9) Edit Teacher
router.put('/teachers/editTeacher/:id',jwtMiddleware,multerConfig.single('teacherImage'),teacherController.editTeacherInfo)

//10) Edit Student
router.put('/students/editStudent/:id',jwtMiddleware,multerConfig.single('studentImage'),studentController.editStudentInfo)

//11) Edit Class
router.put('/classes/editClass/:id',jwtMiddleware,classController.editClassInfo)

//12) Edit AdminProfile
router.put('/admin/UpdateInstituteProf',jwtMiddleware,multerConfig.single('schoolImage'),adminController.editAdminProfile)

//13) Update Admin Login info
router.put('/admin/UpdateAdminInfo',jwtMiddleware,adminController.editAdminInfo)

//14) delete Teacher
router.delete('/teachers/deleteTeacher/:id',jwtMiddleware,teacherController.deleteTeacher)

//15) delete Student
router.delete('/students/deleteStudent/:id',jwtMiddleware,studentController.deleteStudent)

//16) delete Class
router.delete('/classes/deleteClass/:id',jwtMiddleware,classController.deleteClass)

//17) delete Admin Account
router.delete('/admin/deleteAdmin/:id',jwtMiddleware,adminController.deleteAdmin)

//18) Teacher Login
router.post('/teacher/login',teacherController.TeacherLogin)

//19) Admin Info
router.get('/admin/all-admin',jwtMiddleware,adminController.getAdminInfo)

//20) Update Teacher Login info
router.put('/teacher/UpdateTeacherInfo/:id',jwtMiddleware,teacherController.editTchrLogInfo)

//21) Student Login
router.post('/student/login',studentController.StudentLogin)

//22) Update Student Login info
router.put('/student/UpdateStudentInfo/:id',jwtMiddleware,studentController.editStudLogInfo)



module.exports = router