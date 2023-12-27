import express from 'express';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router();

//CREATE

router.post('/', verifyAdmin, createHotel)

//UPDATE

router.put('/:id', verifyAdmin, updateHotel)

//DELETE

router.delete('/:id', verifyAdmin, deleteHotel)

//GET

router.get('/find/:id', getHotel)

//GET ALL

router.get('/', getHotels)

// Count By City

router.get('/countByCity', countByCity)

// Count By Type

router.get('/countByType', countByType)

// GET ALL ROOMS

router.get('/room/:id', getHotelRooms)

export default router