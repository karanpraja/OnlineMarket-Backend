// const express=require('expi
// import { Router } from "express";
// import { createProduct } from "../controller/ProductController";
const Express=require('express')//1
const router=Express.Router()//what is this?2
const {createProduct, fetchProductByFilter, fetchProductById, updateProductById}=require('../controller/ProductController')

router
.post('/',createProduct)
.get('/',fetchProductByFilter)
.get('/:id',fetchProductById)
.patch('/:id',updateProductById)


exports.router=router//4
