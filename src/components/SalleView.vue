<template>
  <div class="container-fluid">
    <h1 class="main-title my-4 display-4">CHEZ SISSI</h1>
    <div class="row">
      <!-- Salle -->
      <div class="restaurant col-md-9">
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
        <div v-if="listCommands" class="border rounded p-3 mb-3 bg-light">
          <h3>Commandes</h3>
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
          <h4>Table {{ selectedTable }} - Commande</h4>
          <ul class="list-group mb-3">
            <li
              v-for="plat in plats"
              :key="plat.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{ plat.nom }} - {{ plat.prix }} Ariary
              <button class="btn btn-sm btn-primary" @click="ajouterPlat(plat)">Commander</button>
            </li>
          </ul>

          <div class="recap">
            <h5>Commande actuelle :</h5>
            <ul>
              <li v-for="(item, index) in commandesParTable[selectedTable]" :key="index">
                {{ item.nom }} - {{ item.prix }} Ariary
              </li>
            </ul>
            <p><strong>Total :</strong> {{ commandesParTable[selectedTable].reduce((acc, p) => acc + p.prix, 0) }} €</p>
            <button class="btn btn-sm btn-secondary" @click="showPlats = false">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedTable = ref(null)
const showPlats = ref(false)
const listCommands = ref(false)
const commands = ref({});
const tables = [1, 2, 3, 4, 5, 6, 7, 8] 


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

const plats = [
  { id: 1, nom: 'Pizza', prix: 10 },
  { id: 2, nom: 'Salade', prix: 8 },
]

const grid = [
  {}, { type: 'rectangle', label: '1' }, { type: 'rectangle', label: '2' }, {},
  { type: 'square', label: '3' }, { type: 'round', label: '4' }, { type: 'round', label: '5' }, { type: 'square', label: '6' },
  {}, { type: 'rectangle', label: '7' }, { type: 'rectangle', label: '8' }, {},
  {}, { type: 'comptoir', label: 'Comptoir', span: '2 / span 2' }, {}, {}
]

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
  commandesParTable.value[selectedTable.value].push(plat)
}

function handleClick(cell) {
  if (cell.type === 'comptoir') {
    showCommands()
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