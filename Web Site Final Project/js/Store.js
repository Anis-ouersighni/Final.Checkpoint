/* Nb : Some Lines Of This Js code are Imported from Sites such as W3schools ..  But i Did Some Changes So that The Program Becomes Understandable and More Efficient */

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

/* cette fonction est associée pour affectuer les fonctions (event)au btn remove ,, reintializer l'input field pour 
chaque article ,, et  ajouter event pour button add to cart au dessous de chaque article  */


    var removeCartItemButtons = document.getElementsByClassName('remove') 
    /* on a recupéré **les Btns** remove lkol dans un HTML collection */
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]           
        button.addEventListener('click', removeCartItem)
        /*pour chaque button on a effectué la fonction removecart item declarer ensuite*/
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
        /*pour chaque input field on a effectué la fonction quantity changed pour actualiser 
        le contenue de l'input  declarer ensuite*/
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    /* les buttons add to cart sont declarer en html . on fait l'appel pour on effectue l'event 
    addToCartClicked */
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }





    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    /* Des qu'on tape Le Premier fois Purchase Button ( [0] )  la fonction purchaseClicked S'exécute
    ( un message s'affiche et les elements dans le champs cart items seront supprimé*/
}

function purchaseClicked() {
    alert('You will recieve your order in the coming 48 Hours')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    /* cart-items est une Div vide qu'on remplir a l'aide de Js c'est où on fait l'append des articles */
    while (cartItems.hasChildNodes())  /* tant que cart items contient des element on supprime a chaque fois le premier child */
     {
        cartItems.removeChild(cartItems.firstChild)
      /* supprimer les elements */
    }

    updateCartTotal()
    /*le montant */
}

function removeCartItem(event) {        // l'event c'est : Click
    var buttonClicked = event.target        // e.target refers to the clicked <button> element
    buttonClicked.parentElement.parentElement.remove()  // cartRowContents  bkolha sera supprimé 
                                                        //parent lawel huwa div w parent thany huwa al div lkbyra  ily tzadat bil js
    updateCartTotal()
}

function quantityChanged(event) {   // l'event c'est change 
    var input = event.target            
    if (isNaN(input.value) || input.value <= 0) /*si l'input est N'est pas un nombre ou l'input est negative 
    on met par defaut 1 */
    {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) { // l'event est Click
    var button = event.target
    var shopItem = button.parentElement.parentElement // parent 1 :shop-item-details / parent 2 : shop-item
                                                      // parents ta3 l button ily nzelna aaliha  
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText   // name ily entre <> ... <>
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText   // price ily entre <> ... <>
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src      // src ta3 image
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row') // on effectue le nom du class cart-row a CartRow Div
    var cartItems = document.getElementsByClassName('cart-items')[0] // recoit les articles dans le div cart-items ( initialement vide )  : [0]==> cart row 
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title') // les titres des articles achetés 
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    
    /* l'append d'un seul article */

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger remove" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents  // ecrire dans html dans cartRow Div 
    cartItems.append(cartRow)       // l'ajout finale dans html du cartRow 
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] /* cartRow */
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length /* les elements */ ; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Dt',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '  Dinars  ' + total
}
