// Run this when the popup is loaded
document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveItem");
  const categorySelect = document.getElementById("category");
  const shoppingList = document.getElementById("shoppingList");
  const itemPreview = document.getElementById("itemPreview");

  // Object to store current tab info
  let currentTabInfo = {
    title: "",
    url: "",
  };

  // Load the current tab's title and url and display preview
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    currentTabInfo.title = truncateString(currentTab.title, 50);
    currentTabInfo.url = currentTab.url;

    itemPreview.textContent = `"${currentTabInfo.title}"`;
  });

  // Load shopping list on popup open
  loadShoppingList();

  // Handle Save Item button click
  saveButton.addEventListener("click", function () {
    const category = categorySelect.value;

    // Retrieve existing shopping list from storage
    chrome.storage.sync.get({ shoppingItems: [] }, function (result) {
      const shoppingItems = result.shoppingItems;

      // Add new item
      shoppingItems.push({
        title: currentTabInfo.title,
        url: currentTabInfo.url,
        category,
      });

      // Save updated list
      chrome.storage.sync.set({ shoppingItems }, function () {
        loadShoppingList(); // Reload display
      });
    });
  });

  // Load shopping list and display grouped by category
  function loadShoppingList() {
    chrome.storage.sync.get({ shoppingItems: [] }, function (result) {
      const shoppingItems = result.shoppingItems;

      // Clear shopping list display
      shoppingList.innerHTML = "";

      // Group items by category
      const groupedItems = {};
      shoppingItems.forEach((item, index) => {
        if (!groupedItems[item.category]) {
          groupedItems[item.category] = [];
        }
        // Store item + its index so we can delete it later
        groupedItems[item.category].push({ item, index });
      });

      // For each category, create a section
      for (const category in groupedItems) {
        const categoryGroup = document.createElement("div");
        categoryGroup.classList.add("category-group");

        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        categoryGroup.appendChild(categoryTitle);

        const ul = document.createElement("ul");

        groupedItems[category].forEach(({ item, index }) => {
          const li = document.createElement("li");

          // Item text and link
          const itemText = document.createElement("span");
          itemText.innerHTML = `"${item.title}" (<a href="${item.url}" target="_blank">Link</a>)`;

          // Delete button with Material icon
          const deleteButton = document.createElement("span");
          deleteButton.classList.add("material-icons", "delete-button");
          deleteButton.textContent = "delete";

          // When delete button is clicked
          deleteButton.addEventListener("click", function () {
            deleteItem(index);
          });

          li.appendChild(itemText);
          li.appendChild(deleteButton);
          ul.appendChild(li);
        });

        categoryGroup.appendChild(ul);
        shoppingList.appendChild(categoryGroup);
      }
    });
  }

  // Permanently delete item by index
  function deleteItem(indexToDelete) {
    chrome.storage.sync.get({ shoppingItems: [] }, function (result) {
      let shoppingItems = result.shoppingItems;

      // Remove item at index
      shoppingItems.splice(indexToDelete, 1);

      // Save updated list
      chrome.storage.sync.set({ shoppingItems }, function () {
        loadShoppingList(); // Refresh display
      });
    });
  }

  // Utility function to truncate long titles
  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  }
});
