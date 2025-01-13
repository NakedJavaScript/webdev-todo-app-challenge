// Get the essential elements
const addButton = document.getElementById("add-todo-btn");
const listItemsContainer = document.getElementById("list-item-container");
const itemModal = document.getElementById("item-modal");
const closeModal = document.getElementById("close-modal");
const itemInput = document.getElementById("item-input");
const filterAllButton = document.getElementById("filter-all");
const filterOpenButton = document.getElementById("filter-open");
const filterDoneButton = document.getElementById("filter-done");

// Function to save items into localStorage
const saveItemsToLocalStorage = () => {
  const items = [];
  document.querySelectorAll(".item").forEach((item) => {
    const checkbox = item.querySelector(".item-checkbox");
    const text = item.querySelector("span").textContent;

    items.push({
      text,
      completed: checkbox.checked,
    });
  });

  localStorage.setItem("items", JSON.stringify(items));
};

// Function to load items into localStorage
const loadItemsFromLocalStorage = () => {
  const savedTasks = JSON.parse(localStorage.getItem("items")) || [];
  savedTasks.forEach((item) => {
    addTaskToList(item.text, item.completed);
  });
};

// Function to add an item to the page
const addTaskToList = (itemText, isCompleted = false) => {
  const listItem = document.createElement("li");
  listItem.classList.add("item");

  // Create the checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("item-checkbox");
  checkbox.checked = isCompleted;

  // Create a span for the item text
  const itemSpan = document.createElement("span");
  itemSpan.textContent = itemText;

  // Create the edit button
  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.innerHTML = '<span class="material-symbols-outlined">edit </span>';

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML =
    '<span class="material-symbols-outlined">delete </span>';

  // Append elements to the list item
  listItem.appendChild(checkbox);
  listItem.appendChild(itemSpan);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  // Append the list item to the list item container
  listItemsContainer.appendChild(listItem);

  // Checkbox toggle logic
  checkbox.addEventListener("change", () => {
    itemSpan.style.color = checkbox.checked ? "#0f282f99" : "#0F282F";
    saveItemsToLocalStorage();
  });

  // Delete button logic
  deleteButton.addEventListener("click", () => {
    listItem.remove();
    saveItemsToLocalStorage();
  });

  // Edit button logic
  editButton.addEventListener("click", () => {
    const newTaskText = prompt("Edit your item:", itemSpan.textContent);
    if (newTaskText) {
      itemSpan.textContent = newTaskText.trim();
      saveItemsToLocalStorage();
    }
  });

  // Style based on the status
  if (isCompleted) {
    itemSpan.style.color = "#0f282f99";
  }

  // Save items to localStorage
  saveItemsToLocalStorage();
};

// Open modal
addButton.addEventListener("click", () => {
  itemModal.style.display = "flex";
});

// Close modal
closeModal.addEventListener("click", () => {
  itemModal.style.display = "none";
  itemInput.value = "";
});

// Save item from input
itemInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const itemText = itemInput.value.trim();

    if (itemText) {
      addTaskToList(itemText);
      itemInput.value = "";
      itemModal.style.display = "none";
    } else {
      alert("Please enter an item!");
    }
  }
});

// Filter items
const filterTasks = (filter) => {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    const checkbox = item.querySelector(".item-checkbox");

    if (filter === "all") {
      item.style.display = "flex";
    } else if (filter === "open") {
      item.style.display = checkbox.checked ? "none" : "flex";
    } else if (filter === "done") {
      item.style.display = checkbox.checked ? "flex" : "none";
    }
  });
};

// Add event listeners to filter buttons
filterAllButton.addEventListener("click", () => {
  filterTasks("all");
  setActiveFilter(filterAllButton);
});

filterOpenButton.addEventListener("click", () => {
  filterTasks("open");
  setActiveFilter(filterOpenButton);
});

filterDoneButton.addEventListener("click", () => {
  filterTasks("done");
  setActiveFilter(filterDoneButton);
});

// Helper function to mark the active filter button
const setActiveFilter = (activeButton) => {
  [filterAllButton, filterOpenButton, filterDoneButton].forEach((button) => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
};

// Load items on page load
document.addEventListener("DOMContentLoaded", () => {
  loadItemsFromLocalStorage();
  filterTasks("all");
  filterAllButton.classList.add("active");
});
