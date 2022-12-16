import { cardInfomation } from "./info.js";
import "../style/main.css";
import "../style/preloader.css";

const itemsGrid = document.querySelector('.items-grid');
let fillInStatus = false;
let gridItems;

const createItem = () => { // the function of creating a new card
    let newItem = document.createElement('div');
    newItem.classList.add('loading');
    newItem.innerHTML = '<img src="./img/Preloader.png"/>';
    gridItems = itemsGrid.querySelectorAll('.grid-item').length;
    setTimeout(() => {
        newItem.removeChild(itemsGrid.querySelector('img'));
        newItem.classList.remove('loading')
        newItem.classList.add('grid-item');

        let newItemTitle = document.createElement('h3');
        newItemTitle.classList.add('grid-item__title');
        newItemTitle.innerHTML = `${cardInfomation[gridItems].title}`;
        newItem.append(newItemTitle);

        let newItemText = document.createElement('p');
        newItemText.classList.add('grid-item__text');
        newItemText.innerHTML = `${cardInfomation[gridItems].text}`;
        newItem.append(newItemText);

        let cardControl = document.createElement('div');
        cardControl.classList.add('card-control')
        cardControl.innerHTML = '<a class="btn btn-read_more">Подробнее</a><a class="btn btn-delete"></a>';
        newItem.append(cardControl);
        gridItems = itemsGrid.querySelectorAll('.grid-item').length;

        alignCard();
        readMoreBtn();
        deleteItem();
    }, 3000);

    return newItem;
}

const addItem = () => { // the function of adding a new card to the page
    let addItemBtn = document.querySelector('.btn-add-item');
    addItemBtn.addEventListener('click', () => {
        itemsGrid.append(createItem());
    });
};

const removeItem = () => { // the function of remove a last card to the page
    let removeItemBtn = document.querySelector('.btn-remove-item');
    removeItemBtn.addEventListener('click', () => {
        itemsGrid.removeChild(itemsGrid.lastChild);
        alignCard();
    });
};

const fillGrid = () => {
    let fillGridBtn = document.querySelector('.btn-fill');
    fillGridBtn.addEventListener('click', () => {
        fillInStatus = true;
        fillIn();
    });
}

const clearGrid = () => {
    let clearGridBtn = document.querySelector('.btn-clear');
    clearGridBtn.addEventListener('click', () => {
        fillInStatus = false;
        gridItems = itemsGrid.querySelectorAll('.grid-item');
        gridItems.forEach((item, idx) => {
            if(idx !== 0){
                item.remove();
            }
        });
        alignCard();
    });
}

const fillIn = () => {
    const rect = itemsGrid.getBoundingClientRect();
    let windowHeight = window.innerHeight;
    gridItems = itemsGrid.querySelectorAll('.grid-item').length;
    let itemsCount = Math.ceil((windowHeight - rect.y) / 120) * 3 - gridItems;
    for(let i=1; i<=itemsCount; i++) {
        itemsGrid.append(createItem());
    }
}
window.addEventListener('wheel', (e) => {
    if(fillInStatus) {
        fillIn();
    }
});

const fillInMob = () => {
    const rect = itemsGrid.getBoundingClientRect();
    let windowWidth = window.innerWidth;
    gridItems = itemsGrid.querySelectorAll('.grid-item').length;
    let itemsCount = Math.ceil((windowWidth - rect.x) / 120) - gridItems;
    console.log(gridItems)
    console.log(itemsCount)
    for(let i=1; i<=itemsCount; i++) {
        itemsGrid.append(createItem());
    }
}
window.addEventListener('touchmove', (e) => {
    if(fillInStatus) {
        fillIn();
    }
});

const alignCard = () => {
    gridItems = itemsGrid.querySelectorAll('.grid-item').length;
    if(gridItems > 2) {
        itemsGrid.classList.add('jc-fs')
    } else {
        itemsGrid.classList.remove('jc-fs')
    }
}

const readMoreBtn = () => {
    let readMoreBtns = document.querySelectorAll('.btn-read_more');
    readMoreBtns.forEach((item) => {
        item.addEventListener('click', () => {
            let itemTitle = item.closest('.grid-item').querySelector('.grid-item__title').textContent;
            let itemText = item.closest('.grid-item').querySelector('.grid-item__text').textContent;
            document.querySelector('.popup').classList.add('active');
            document.querySelector('.popup .popup-wrap h4').textContent = itemTitle;
            document.querySelector('.popup .popup-wrap p').textContent = itemText;
        });
    });
}
const closedPopup = () => {
    let closedBtn = document.querySelector('.closed-popup');
    closedBtn.addEventListener('click', (item) => {
        document.querySelector('.popup').classList.remove('active');
    });
}

const deleteItem = () => {
    let deleteItemBtns = document.querySelectorAll('.btn-delete');
    deleteItemBtns.forEach((item) => {
        item.addEventListener('click', () => {
            item.closest('.grid-item').remove();
        });
    });
}

addItem();
removeItem();
fillGrid();
clearGrid();
readMoreBtn();
closedPopup();
deleteItem();