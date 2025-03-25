require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT || 4000;
const express=require("express")
const jwt=require("jsonwebtoken")
const cors=require("cors")
const app=express()
const bcrypt=require("bcryptjs")
app.use(express.json())
app.use(cors())
const users = [
    { id: 1, username: "madhav", password: bcrypt.hashSync("password123", 10) },
];
const cardData = [
  { 
    id: 1, 
    title: "Mumbai", 
    location: "Maharashtra", 
    image: "https://png.pngtree.com/png-vector/20240309/ourmid/pngtree-mumbai-skyline-with-gray-landmarks-blue-sky-and-reflections-png-image_11905588.png", 
    description: "The financial capital of India, known for Bollywood and the Gateway of India.", 
    population: "20M", 
    area: "603.4 km²",
    latitude: 19.0760, 
    longitude: 72.8777
},
{ 
    id: 2, 
    title: "Delhi", 
    location: "Delhi NCR", 
    image: "https://png.pngtree.com/png-vector/20240204/ourmid/pngtree-red-fort-india-png-image_11541569.png", 
    description: "India’s capital, rich in history and home to iconic landmarks.", 
    population: "19M", 
    area: "1,484 km²",
    latitude: 28.7041, 
    longitude: 77.1025
},
{ 
    id: 3, 
    title: "Bangalore", 
    location: "Karnataka", 
    image: "https://ramkae.com/new/wp-content/uploads/2020/09/bangalore-png-8-png-image-bangalore-png-800_537.png", 
    description: "The Silicon Valley of India, famous for its IT industry and pleasant climate.", 
    population: "12M", 
    area: "709 km²",
    latitude: 12.9716, 
    longitude: 77.5946
},
{ 
    id: 4, 
    title: "Hyderabad", 
    location: "Telangana", 
    image: "https://1.bp.blogspot.com/-GmRzqJCF9Ys/YL8r5QxzsFI/AAAAAAAAEaQ/MVzw_8Ip_eUOuiDC5o6lmmyxbP5ezcUjACNcBGAsYHQ/s642/Dsr3.png", 
    description: "The city of pearls, known for its IT sector and delicious biryani.", 
    population: "10M", 
    area: "650 km²",
    latitude: 17.3850, 
    longitude: 78.4867
},
{ 
    id: 5, 
    title: "Chennai", 
    location: "Tamil Nadu", 
    image: "https://www.templebilling.com/web/slide/masterslider/quality1.png", 
    description: "A coastal city famous for its temples, beaches, and filter coffee.", 
    population: "11M", 
    area: "426 km²",
    latitude: 13.0827, 
    longitude: 80.2707
},
];
const intializeServe=()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`Server started on port ${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}
intializeServe()
const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send({ message: "User not logged in" });
    } else {
      jwt.verify(jwtToken, JWT_SECRET, async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.username = payload.username;
          next();
        }
      });
    }
  };
app.post("/login",(req,res)=>{
    const {username,password}=req.body
    const user=users.find(each=>each.username===username)
    if(user){
        const password2=bcrypt.compareSync(password,user.password)
        if(password2){
            const payload={username:username}
              const token=jwt.sign(payload,JWT_SECRET)
              res.send({token})
        }else{
            res.status(400)
            res.send("invalid password")
        }
    }else{
        res.status(400)
        res.send("user doesnot exists")
    }

})
app.get("/dashboard",authenticateToken,(req,res)=>{
    res.send({cardData})

})
app.get("/api/map/:id",authenticateToken, (req, res) => {
  const {id}=req.params
  const item=cardData.find(each=>each.id===parseInt(id))
  console.log(item)
  const {title,longitude,latitude}=item
  if (!item) {
    return res.status(404).json({ message: "Location not found" });
  }
  const element={
    title:title,
    longitude:longitude,
    latitude:latitude,
    zoom:5
  }
  res.send({
    mapDetails:element
  })
});

module.exports=app
