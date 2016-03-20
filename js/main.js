

//############### Class Case ###############################

function Case() {
}

/**
 * dessine l'image bleue avec la classe "img-responsive" et "colonneY" avec Y le numero de sa colonne dans la grille
 * attribut a l'image ses fonctions selection() et deselection()
 * @param y
 * @returns {*|jQuery|HTMLElement}
 */
Case.prototype.dessine = function(y) {
    var retour = $('<img />');

    retour.attr('src', 'img/caseVideTrans.png');
    retour.attr('class', 'img-responsive colonne' + y.toString());
    retour.attr('onmouseover', 'selection(' + y.toString() + ')');
    retour.attr('onmouseout', 'deselection(' + y.toString() + ')');
    retour.attr('onclick', 'jouer(' + y.toString() +')');

    return retour;
}

/**
 * Rend la fleche au dessus de la colonne visible et blanchie la colonne de y
 * @param y
 */
var selection = function(y) {
    $('#fleche' + y).css({'visibility': 'visible'});
    $('.colonne' + y).css({'opacity': '0.8'});
}

/**
 * Rend la fleche au dessus de la colonne invisible et retablie la couleur de la colonne de y
 * @param y
 */
var deselection = function(y) {
    $('#fleche' + y).css({'visibility': 'hidden'});
    $('.colonne' + y).css({'opacity': '1'});
}

//################# Class Grille ############################

/**
 * classe Grille, constructeur qui defini la taille de la grille et declare la matrice
 * @constructor
 */
function Grille() {
	this.tailleL = 7;
    this.tailleH = 6;
    this.tableau = new Array();
    for(var y = 0; y < this.tailleH; ++y) {
        this.tableau[y] = new Array();
        for(var x = 0; x < this.tailleL; ++x) {
            this.tableau[y][x] = new Case();
        }
    }
}


/**
 * declare  la table en css, et appele pour que ligne, la fonction Grille.ligne()
 * @returns {*|jQuery|HTMLElement}
 * @see Grille.prototype.ligne
 */
Grille.prototype.dessine = function() {
    var retour = $('<table />');
    for(var x = 0; x<this.tailleH; ++x) {
        retour.append(this.ligne(x));
    };

    return retour;
}

Grille.prototype.aJour = function() {

}

/**
 * Recupere le numero de la ligne 'x' pour initialiser les colonnes et appele la fonction Case.dessine()
 * @param x
 * @returns {*|jQuery|HTMLElement}
 * @see Case.prototype.dessine
 */
Grille.prototype.ligne = function(x) {
	var retour = $('<tr />');
	for(var y = 0 ; y < this.tailleL; ++y) {
		retour.append(
            $('<td id="case' + y.toString() +''+ x.toString() + '" valign="top" style="background-color: #C7F7FF;" />').append(
                this.tableau[x][y].dessine(y)
            )
        );
	};
	return retour;
}


//#########################################################

/**
 * declare la table en css où seront rangées les fleches au dessus de la grille et appele flecheDessineLigne()
 * @returns {*|jQuery|HTMLElement}
 * @see flecheDessineLigne
 */
var flecheDessine = function() {
    var retour = $('<table />');
    retour.append(flecheDessineLigne());
    return retour;
}

/**
 * dessine les fleches avec les attributs class=img-responsive, visibility: hidden et id="flecheX" où X est le numero de colonne de la fleche
 * @returns {*|jQuery|HTMLElement}
 */
var flecheDessineLigne = function() {
    var retour = $('<tr />');
    for(var x = 0; x < 7; ++x) {
        retour.append(
            $('<td id="case' + x.toString() + '" valign="top" />').append(
                '<img id="fleche' + x.toString() + '" src="img/fleche2.png" class="img-responsive" style="visibility: hidden;">'
            )
        );
    }
    return retour;
}

/**
 * verifie si le tableau est plein en appelant colonnePleine()
 * @returns {boolean}
 * @see colonnePleine
 */
var tableauPlein = function() {
    for(var numColonne = 0; numColonne < 6; ++numColonne) {
        if(!colonnePleine(numColonne))
            return false;
    }
    return true;
}

/**
 * Verifie si la colonne est pleine
 * @param numColonne
 * @returns {boolean}
 */
var colonnePleine = function(numColonne) {
   // var cellule = $('#case0' + numColonne);
    if($('#case0' + numColonne).style.backgroundcolor = '#C7F7FF') //ICI
        return false;
    return true;
}

const JOUEUR1 = 1;              //joueur 1
const JOUEUR2 = 2;              //joueur 2
const EN_COURS = 0;             //si on est en cours de partie ou egalité

var changerJoueur = function() {
    if(joueur == JOUEUR1)
        joueur = JOUEUR2;
    else
        joueur = JOUEUR1;
}

var initialiserPlateau = function() {
    var grille = new Grille();
    //grille.initialise();
    $('#plateau').append(grille.dessine());
    console.log(grille.dessine());
    $('#fleches').append(flecheDessine());
}

var jouer = function(numColonne) {
    var resultatPartie = 0;
    initialiserPlateau();
    while (resultatPartie == EN_COURS && !tableauPlein()) {
        console.log('en cours');
    }
}


//#########################################################

$(document).ready(function() {

    /**
     * effet sur la connexion
     */
    $.ajax({
        method: "get",
		url: "json_est_connecte.php",
		dataType: 'json',
		success: function(data) {
           if (data.est_connecte) {
                $('#form-logout').fadeIn();
            }
            else {
                $('#form-login').fadeIn();
            }
            if (typeof(data.message)!= 'undefined') {
                $('#message-contenu').html(data.message);
                $('#message').slideDown();
            }
		},
        error: function() {
		    alert('erreur');
	    }
    });

    /**
     * effet sur le bouton fermer
     */
    $('#message-btn-fermer').click(function(){
        $('#message').slideUp();
    });


    /**
     * Pour la connexion
     */
    $('#form-login').submit(function() {
	    $.ajax({
            method: $(this).attr('method'),
		    url: $(this).attr('action'),
            data: $(this).serialize(),
		    dataType: 'json',
		    success: function(data) {
			    if (data.success) {
                    $('#form-logout').fadeIn();
                }
                else {
                }
                if (typeof(data.message) != 'undefined') {
                    $('#message-contenu').html(data.message);
                    $('#message').slideDown();
                }
		    },
            error: function() {
		        alert('erreur');
	        }
        });
        $(this).hide();
        return false;
    });

    /**
     * pour la deconnexion
     */
    $('#form-logout').submit(function() {
        $.ajax({
            method: $(this).attr('method'),
		    url: $(this).attr('action'),
            data: $(this).serialize(),
		    dataType: 'json',
		    success: function(data) {
			    if (data.success) {
                    $('#form-login').fadeIn();
                }
                else {
                    console.log("erreur");
                }
                if (typeof(data.message)!= 'undefined') {
                    $('#message-contenu').html(data.message);
                    $('#message').slideDown();
                }
		    },
            error: function() {
		        alert('erreur');
	        }
        });
        $(this).hide();
        return false;
    });

    $('#boutonCreerPartie').click(function(){
        $(this).slideUp();
        $('#jeu').slideDown();
        jouer();
        /*var grille = new Grille();
        //grille.initialise();
        $('#plateau').append(grille.dessine());
        console.log(grille.dessine());
        $('#fleches').append(flecheDessine());*/
    });
});