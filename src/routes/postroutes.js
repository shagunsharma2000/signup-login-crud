const express = require('express');
const router = express.Router();
const post = require('../controller/postcontroller');

router.post("/user", (req, res) => post.create(req, res));
router.put("/user/:id", (req, res) => post.findById(req, res));
router.delete("/user/:id", (req, res) => post.findByI(req, res)); // Corrected function name
module.exports = router;
