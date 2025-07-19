const searchInput = document.getElementById('searchInput');
const birdCardsContainer = document.getElementById('birdCards');

function getConservationStatusColor(status) {
  switch (status) {
    case "LC": return "bg-green-200 text-green-800";
    case "NT": return "bg-yellow-200 text-yellow-800";
    case "VU": return "bg-orange-200 text-orange-800";
    case "EN": return "bg-red-200 text-red-800";
    case "CR": return "bg-red-600 text-white";
    default: return "bg-gray-200 text-gray-800";
  }
}

function createCardHTML(bird) {
  return `
    <div class="card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <div class="card-inner relative">
        <div class="card-face p-4">
          <img src="${bird.image}" alt="${bird.name}" class="w-full h-48 object-cover rounded" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image';">
          <h2 class="text-xl font-semibold mt-2">${bird.name}</h2>
          <p class="italic text-gray-600">${bird.scientific_name}</p>
          <p class="text-sm mt-2">${bird.description}</p>
          <span class="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${getConservationStatusColor(bird.conservation_status)}">
            ${bird.conservation_status}
          </span>
          <p class="text-xs text-gray-400 mt-2">Photo: <a href="${bird.photo_credit_url}" class="underline" target="_blank" rel="noopener">${bird.photo_credit}</a></p>
        </div>
      </div>
    </div>
  `;
}

function renderCards(filteredBirds) {
  birdCardsContainer.innerHTML = filteredBirds.map(createCardHTML).join('');

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
    card.setAttribute("tabindex", "0");
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") card.classList.toggle("is-flipped");
    });
  });
}

function handleSearch() {
  const query = searchInput.value.toLowerCase();
  const filtered = birds.filter((bird) =>
    bird.name.toLowerCase().includes(query) || bird.scientific_name.toLowerCase().includes(query)
  );
  renderCards(filtered);
}

searchInput.addEventListener('input', handleSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    handleSearch();
  }
});

// Initial render
renderCards(birds);
