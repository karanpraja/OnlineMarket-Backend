// const express=require('expi
// import { Router } from "express";
// import { createProduct } from "../controller/ProductController";
const Express=require('express')//1
const router=Express.Router()//what is this?2
const {createProduct, fetchProductByFilter}=require('../controller/ProductController')

router.post('/products',createProduct).get('/products',fetchProductByFilter)


exports.router=router//4
