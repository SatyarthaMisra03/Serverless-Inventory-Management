let inventory = [];
let editingIndex = -1; 

// NAV
function enterSystem() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function logout() {
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

// FORM SUBMIT
function handleFormSubmit(e) {
    e.preventDefault();

    const item = {
        Type: document.getElementById('assetType').value,
        Name: document.getElementById('assetName').value,
        Serial: document.getElementById('serialNo').value,
        Date: document.getElementById('purchaseDate').value
    };

    if (editingIndex === -1) {
        // ADD
        inventory.push(item);
    } else {
        // UPDATE
        inventory[editingIndex] = item;
        editingIndex = -1;
        resetFormUI();
    }

    renderTable();
    document.getElementById('assetForm').reset();
}

// EDIT LOGIC
function startEdit(index) {
    editingIndex = index;
    const item = inventory[index];

    document.getElementById('assetType').value = item.Type;
    document.getElementById('assetName').value = item.Name;
    document.getElementById('serialNo').value = item.Serial;
    document.getElementById('purchaseDate').value = item.Date;

    document.getElementById('formTitle').innerText = "Edit Asset Details";
    document.getElementById('submitBtn').innerText = "Update Details";
    document.getElementById('submitBtn').style.background = "#f1c40f"; // Yellow for edit
    document.getElementById('submitBtn').style.color = "black";
    document.getElementById('cancelBtn').classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// DELETE LOGIC
function deleteAsset(index) {
    if(confirm("Are you sure you want to delete this asset?")) {
        inventory.splice(index, 1);
        renderTable();
    }
}

// RENDER TABLE
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    inventory.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.Type}</td>
                <td>${item.Name}</td>
                <td>${item.Serial}</td>
                <td>${item.Date}</td>
                <td>
                    <button class="edit-btn" onclick="startEdit(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteAsset(${index})">Delete</button>
                </td>
            </tr>`;
    });
}

// RESET UI
function resetForm() {
    document.getElementById('assetForm').reset();
    editingIndex = -1;
    resetFormUI();
}

function resetFormUI() {
    document.getElementById('formTitle').innerText = "Enter Asset Details";
    document.getElementById('submitBtn').innerText = "Add to Inventory";
    document.getElementById('submitBtn').style.background = "#2ecc71"; // Back to Green
    document.getElementById('submitBtn').style.color = "white";
    document.getElementById('cancelBtn').classList.add('hidden');
}

// EXCEL FUNCTIONS
function saveExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(inventory);
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, "IT_Inventory.xlsx");
}

function loadExcel(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, {type: 'array'});
        inventory = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        renderTable();
    };
    reader.readAsArrayBuffer(file);
}