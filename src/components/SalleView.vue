<template>
  <div class="container-fluid">
    <h1 class="main-title my-4 display-4">CHEZ SISSI</h1>
    <div class="row">

      <!-- Left Sidebar -->

      <div class="col-md-2">
        <div v-if="listCommands" class="border rounded p-3 mb-3 bg-light">
          <h3>Commandes :</h3>
              <ul class="list-unstyled">
                <li v-for="table in tables" :key="table">
                    Table {{ table }} : 
                    {{ getTotal(commandesParTable[table]) }} ariary
                </li>
                <hr />
                <li><strong>Total : {{ getTotalAllCommands() }} Ariary</strong></li>
          </ul>
        </div>

        <div v-if="showPlats" class="menu p-3 bg-white border rounded">
         
            <div v-if="commandesParTable[selectedTable].length === 0">
                 <!-- Si aucune commande -->
              <h5>Table {{ selectedTable }} :</h5>
              <p>Aucune commande pour cette table.</p>
              <button @click="reserver">Réserver</button>
            </div>
            <div v-else>
                 <h5>Table {{ selectedTable }} - Commande :</h5>
              <hr />    
              <div class="recap">
                <ul>
                  <li v-for="(item, index) in commandesParTable[selectedTable]" :key="index">
                    {{ item.nom }} - {{ item.prix }} Ariary
                  </li>
                </ul>
                <hr />
                <p class=""><strong>Total :</strong> {{ commandesParTable[selectedTable].reduce((acc, p) => acc + p.prix, 0) }} Ariary</p>
              </div>
              </div>
            </div>
             
            

        </div>

      <!-- Salle -->
      <div class="restaurant col-md-7">
        <div class="restaurant-grid">
          <div
            v-for="(cell, index) in grid"
            :key="index"
            :class="[
              'table-container',
              cell.type ? cell.type : '',
              cell.type ? 'clickable' : '',
            ]"
            @click="cell.type ? handleClick(cell) : null"
            :style="cell.span ? { gridColumn: cell.span } : {}"
          >
        
            <!-- Si réservée sans commande -->
            <div
                v-if="reservations.includes(Number(cell.label)) && commandesParTable[cell.label]?.length === 0"
                class="badge badge-rose"
            >
                R
            </div>

            <!-- Si commande en cours -->
            <div
                v-else-if="commandesParTable[cell.label]?.length > 0"
                class="badge badge-jaune"
            >
                C
            </div>

            <div v-if="cell.type" class="table d-flex align-items-center justify-content-center">
              {{ cell.label }}
              <div class="seat top-chair"></div>
              <div class="seat bottom-chair"></div>
              <div class="seat left-chair"></div>
              <div class="seat right-chair"></div>
            </div>
          </div>
        </div>

        <div class="door">Porte</div>
      </div>

      <!-- Sidebar -->
      <div class="col-md-3">
        
          <div class="mt-3">
            <h4>Menu du restaurant</h4>

            <div class="mb-3">
              <label for="categorie">Filtrer par catégorie :</label>
              <select id="categorie" v-model="selectedCategorie" class="form-select">
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
                </option>
              </select>
            </div>

            <ul class="list-group mb-3">
            <li
              v-for="plat in filteredMenu"
              :key="plat.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{ plat.nom }} - {{ plat.prix }} Ariary
              <button class="btn btn-sm btn-primary" @click="ajouterPlat(plat)">Commander</button>
            </li>
            </ul>      
          </div>
        
        </div>
  
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTable = ref(null)
const showPlats = ref(false)
const listCommands = ref(true)
const commands = ref({});
const tables = [1, 2, 3, 4, 5, 6, 7, 8] 

const selectedCategorie = ref('menu')

const categories = ['menu', 'entree','plat', 'pizza', 'boisson', 'dessert', 'divers','tous']


const reservations = ref([1, 3, 5]) // Exemples de tables réservées

const commandesParTable = ref({
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
})

const menu = ref([
  { id: 1, nom: 'Pizza PM', prix: 15000, categorie: "pizza" },
  { id: 2, nom: 'Pizza GM', prix: 24000, categorie: "pizza" },
  { id: 3, nom: 'Salade', prix: 2000, categorie: "divers" },
  { id: 4, nom: "Romazava", prix: 0, categorie: "divers" },
  { id: 5, nom: "Ravitoto sy henakisoa", prix: 12000,  categorie: "plat" },
  { id: 6, nom: "Akoho sy voanio", prix: 11000,  categorie: "plat" },
  { id: 7, nom: "Soupe legume", prix: 6000,categorie: "plat" },
  { id: 8, nom: "Soupe chinoise", prix: 4000,categorie: "plat" },
  { id: 9, nom: "Soupe spéciale", prix: 10000,categorie: "plat" },
  { id: 10, nom: "Mine sao simple", prix: 6000,categorie: "plat" },
  { id: 11, nom: "Mine sao spéciale", prix: 12000,categorie: "plat" },
  { id: 12, nom: "Hena omby ritra", prix: 10000,categorie: "plat" },
  { id: 13, nom: "Tarte coco", prix: 2500, categorie: "dessert" },
  { id: 14, nom: "Jus de mangue", prix: 5000, categorie: "boisson" },
  { id: 15, nom: "Coca-Cola", prix: 7000, categorie: "boisson" },
  { id: 16, nom: "Rillettes de thon maison", prix: 27000, categorie: "entree" },
  { id: 17, nom: "Salade César", prix: 27000, categorie: "menu" },
  { id: 18, nom: "Carpaccio de bœuf ou de saumon", prix: 27000, categorie: "menu" },
  { id: 19, nom: "Canard au poivre vert", prix: 27000, categorie: "menu" },
  { id: 20, nom: "Glace au mirtille", prix: 27000, categorie: "menu" },
  { id: 21, nom: "Banane flambée", prix: 27000, categorie: "dessert" },
  { id: 22, nom: "Jus de corossol", prix: 27000, categorie: "menu" },
  { id: 23, nom: "Jus panaché", prix: 27000, categorie: "boisson" },
  { id: 24, nom: "Pizza 4 fromages", prix: 27000, categorie: "pizza" },
  { id: 25, nom: "Tomates mozzarella (Caprese)", prix: 27000, categorie: "entree" },
  { id: 26, nom: "Tartare de saumon à l’avocat", prix: 27000, categorie: "entree" },
  { id: 27, nom: "Taboulé libanais", prix: 27000, categorie: "entree" },
  { id: 28, nom: "Verrine de crevettes et guacamole", prix: 27000, categorie: "entree" },
  { id: 29, nom: "Chèvre chaud sur toast", prix: 27000, categorie: "entree" },

])

const grid = [
  {}, { type: 'rectangle', label: '1' }, { type: 'rectangle', label: '2' }, {},
  { type: 'square', label: '3' }, { type: 'round', label: '4' }, { type: 'round', label: '5' }, { type: 'square', label: '6' },
  {}, { type: 'rectangle', label: '7' }, { type: 'rectangle', label: '8' }, {},
  {type: 'door', label: 'Porte'}, { type: 'comptoir', label: 'Comptoir', span: '2 / span 2' }, {}, {}
]

const filteredMenu = computed(() => {
  if (selectedCategorie.value === 'tous') {
    return menu.value
  }
  return menu.value.filter(plat => plat.categorie === selectedCategorie.value)
})

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function redirectToOrder(n) {
  selectedTable.value = n
  showPlats.value = true
  listCommands.value = false;
}

function showCommands() {
  listCommands.value = !listCommands.value
  showPlats.value = false
  // Filtrer uniquement les tables avec commandes
  const filtered = Object.entries(commandesParTable.value)
    .filter(([_, commandes]) => commandes.length > 0)
    .reduce((obj, [tableId, commandes]) => {
      obj[tableId] = commandes
      return obj
    }, {})

  commands.value = filtered
}

function getTotal(commands) {
    if (!Array.isArray(commands)) return 0
    return commands.reduce((total, plat) => total + plat.prix, 0)
}

function getTotalAllCommands() {
  return Object.values(commands.value).reduce((acc, commandes) => {
    return acc + getTotal(commandes)
  }, 0)
}

function ajouterPlat(plat) {

  if (!selectedTable.value) {
    alert('Veuillez sélectionner une table avant de réserver.')
    return
  }
  commandesParTable.value[selectedTable.value].push(plat)
}

function handleClick(cell) {
  if (cell.type === 'comptoir') {
    showCommands()
    selectedTable.value = null
  } else {
    redirectToOrder(cell.label)
  }
}
</script>


<style>

.main-title {
  position: relative;
  text-align: left;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  padding: 2rem;
  margin: 0;
  z-index: 1;

  background: url('../assets/images/header.jpg') center/cover no-repeat;
  border-radius: 8px;

  /* Superposition semi-transparente */
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.4); /* noir semi-transparent */

  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 130px);
  gap: 20px;
  justify-items: center;
  align-items: center;
}

.table-container {
  width: 100px;
  height: 100px;
  position: relative;
}

.table {
  background-color: #bcbec2;
  border: 2px solid #333;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  position: relative;
}

.rectangle {
  width: 140px;
  height: 90px;
  border-radius: 10px;
}

.square {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}

.round {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.comptoir {
  background-color: #163e83;
  color: black;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.seat {
  width: 18px;
  height: 18px;
  background-color: #374151;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
}

.top-chair { top: -10px; left: 50%; transform: translateX(-50%); }
.bottom-chair { bottom: -10px; left: 50%; transform: translateX(-50%); }
.left-chair { top: 50%; left: -10px; transform: translateY(-50%); }
.right-chair { top: 50%; right: -10px; transform: translateY(-50%); }

.clickable { cursor: pointer; }

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 4px 6px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 20;
}

.badge-rose {
  background-color: #f472b6; /* table reservée */
  color: white;
}

.badge-jaune {
  background-color: #facc15; /* table occupé et à passer de commande */
  color: black;
}

.door {
    width: 80px;
    height: 120px;
    background: #654321;
    position: absolute;
    bottom: -140px;
    left: 10%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 120px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
}

</style>