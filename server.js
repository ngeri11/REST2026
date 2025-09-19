const express = require("express"); //Express importálása
const app = express(); //Express példányosítása
const port = 3000; //Port beállítása

//Middleware - köztes alkalmazások
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]


//GET végpont egy szöveges üzenet visszaküldésre
app.get('/hello', (req, res) => {
    res.send("Hello itt az Express webszerver!");
})

app.get('/api/courses', (req, res) => {
    res.json(courses);
})

//Egyetlen kurzus adatainak lekérése
app.get('/api/courses/:id', (req,res) => {
    //Keresés a tömben
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    //A keresett elem nem található (404)-es státuszkód nem található
    if (!course) res.status(404).send('A megadott nem létezik kurzus!');
    res.json(course);
})
//POST végppont kurzus adatok küldésére a szervernek
app.post('/api/courses', (req, res) =>{
    //Új kurzusobjektum létrehozása (Az ID automatikus növelése)
    const course ={
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course); //Az új kurzus objektum hozzáadása a courses tömbhöz
    res.json(req,body); // A kibővített kurzus adatainak a lekérése JSON formátumban
})

//A webszerver elindítása
app.listen(port, () => {
    console.log(`A webszerver figyel a localhost:${port} webcímen`);
})