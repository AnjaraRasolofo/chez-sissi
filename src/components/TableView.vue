<template>
  <div class="container-fluid">
    <h1 class="text-center my-4 display-4">CHEZ SISSI</h1>
    <div class="row">
      <!-- Salle -->
      <div class="col-md-9 d-flex flex-wrap justify-content-start position-relative">
        <!-- Exemple Table -->
        <div
          v-for="n in 7"
          :key="n"
          class="table-container m-2"
          :class="{ 'round': n === 1 || n === 4 || n === 7, 'square': n === 2 || n === 3, 'rectangle': n === 5 || n === 6 }"
          @click="redirectToOrder(n)"
        >
          <div class="table d-flex align-items-center justify-content-center">{{ n }}</div>
          <div class="seat top-chair"></div>
          <div class="seat bottom-chair"></div>
          <div class="seat left-chair"></div>
          <div class="seat right-chair"></div>
        </div>

        <!-- Comptoir -->
        <div class="table-container m-2" @click="showCommands()">
          <div class="table bg-secondary text-white d-flex align-items-center justify-content-center">
            Comptoir
          </div>
        </div>

        <!-- Plantes et autres éléments décoratifs -->
        <div class="plant plant1"></div>
        <div class="door">Porte</div>
      </div>

      <!-- Sidebar -->
      <div class="col-md-3">
        <div v-if="commands" class="border rounded p-3 mb-3 bg-light">
          <h3>Commandes</h3>
          <ul class="list-unstyled">
            <li v-for="n in 7" :key="n">Table {{ n }} : 0</li>
            <hr />
            <li><strong>Total : 0 €</strong></li>
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
              {{ plat.nom }} - {{ plat.prix }} €
              <button class="btn btn-sm btn-primary" @click="ajouterPlat(plat)">Commander</button>
            </li>
          </ul>

          <div class="recap">
            <h5>Commande actuelle :</h5>
            <ul>
              <li v-for="(item, index) in commandesParTable[selectedTable]" :key="index">
                {{ item.nom }} - {{ item.prix }} €
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

  import {ref, computed} from 'vue'

  const tables = ref([
          { id: 1, number: 1, status: 'libre', shape: 'rectangle' },
          { id: 2, number: 2, status: 'occupée', shape: 'rond' },
          { id: 3, number: 3, status: 'libre', shape: 'rectangle' },
          { id: 4, number: 4, status: 'réservée', shape : 'rond' },
          { id: 5, number: 5, status: 'libre', shape: 'rectangle' },
          { id: 6, number: 6, status: 'occupée', shape: 'rond' },
          { id: 7, number: 7, status: 'libre', shape: 'rectangle' },
          { id: 8, number: 8, status: 'réservée', shape: 'rond' }
        ]);


      const rectangleTables = computed(() => tables.value.filter(t => t.shape === 'rectangle'))
      const roundTables = computed(() => tables.value.filter(t => t.shape === 'rond'))


    const toggleTableStatus = (id) => {
        const table = tables.value.find(t => t.id === id);
        if (!table) return;
        const next = {
          'libre': 'occupée',
          'occupée': 'réservée',
          'réservée': 'libre'
        };
        table.status = next[table.status];
    }

    const getTableClass = (tables) => {
        switch (tables.status) {
          case 'libre': return 'bg-green-100 text-green-800';
          case 'occupée': return 'bg-red-100 text-red-800';
          case 'réservée': return 'bg-yellow-100 text-yellow-800';
          default: return 'bg-gray-100';
        }
    }

    const getColor = (status) => {
      switch (status) {
        case 'libre':
          return '#10B981' // vert
        case 'occupée':
          return '#EF4444' // rouge
        case 'réservée':
          return '#F59E0B' // jaune
        default:
          return '#9CA3AF' // gris
      }
    }

  </script>
  
  <style scoped>
.table-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.table {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  border: 2px solid #333;
  position: relative;
  text-align: center;
  line-height: 120px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}

.round {
  border-radius: 50%;
}

.square {
  border-radius: 8px;
}

.rectangle {
  width: 160px;
  height: 100px;
  border-radius: 8px;
}

.seat {
  width: 18px;
  height: 18px;
  background-color: #374151;
  border-radius: 50%;
  position: absolute;
}

.top-chair {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-chair {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.left-chair {
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.right-chair {
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
}

/* Optionnel : style de décoration */
.plant, .door, .window {
  /* Placeholder style */
  width: 40px;
  height: 40px;
  background-color: green;
  margin: 5px;
}

  </style>
  