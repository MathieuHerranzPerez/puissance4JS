
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

    retour.attr('src', styleCase);
    retour.attr('class', 'img-responsive colonne' + y.toString());
    retour.attr('onmouseover', 'selection(' + y.toString() + ')');
    retour.attr('onmouseout', 'deselection(' + y.toString() + ')');
    retour.attr('onclick', 'jouerColonne(' + y.toString() +')');

    return retour;
};

/**
 * Rend la fleche au dessus de la colonne visible et blanchie la colonne de y
 * @param y
 */
var selection = function(y) {
    $('#fleche' + y).css({'visibility': 'visible'});
    $('.colonne' + y).css({'opacity': '0.8'});
};

/**
 * Rend la fleche au dessus de la colonne invisible et retablie la couleur de la colonne de y
 * @param y
 */
var deselection = function(y) {
    $('#fleche' + y).css({'visibility': 'hidden'});
    $('.colonne' + y).css({'opacity': '1'});
};

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
    var retour = $('<table  />');
    for(var x = 0; x<this.tailleH; ++x) {
        retour.append(this.ligne(x));
    }
    return retour;
};


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
            $('<td id="case' + y.toString() +''+ x.toString() + '" valign="top" style="background-color: #C7F7FF;" ' +
                'class="clickable" /*onclick="jouerColonne(' + y + ')"*/ />').append(
                this.tableau[x][y].dessine(y)
            )
        );
    }
    return retour;
};


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
};

/**
 * dessine les fleches avec les attributs class=img-responsive, visibility: hidden et id="flecheX" où X est le numero de colonne de la fleche
 * @returns {*|jQuery|HTMLElement}
 */
var flecheDessineLigne = function() {
    var retour = $('<tr />');
    for(var x = 0; x < 7; ++x) {
        retour.append(
            $('<td id="caseFleche' + x.toString() + '" valign="top" />').append(
                '<img id="fleche' + x.toString() + '" src="img/fleche2.png" class="img-responsive" style="visibility: hidden;">'
            )
        );
    }
    return retour;
};

/**
 * verifie si le tableau est plein en appelant colonnePleine()
 * @returns {boolean}
 * @see colonnePleine
 */
var tableauPlein = function() {
    for(var numColonne = 0; numColonne < 7; ++numColonne) {
        if(!colonnePleine(numColonne))
            return false;
    }
    return true;
};

/**
 * Verifie si la colonne est pleine
 * @param numColonne
 * @returns {boolean}
 */
var colonnePleine = function(numColonne) {
    if($('#case' + numColonne +'0').css('background-color') == 'rgb(199, 247, 255)') //verifie si le background est bleu clair (case vide)
        return false;
    return true;
};

const JOUEUR1 = 1;              // joueur 1
const JOUEUR2 = 2;              // joueur 2
var JOUEUR = 1;                 // joueur courant
var styleCase = "img/caseVideTrans.png";

/**
 * change le joueur courant par le nouveau joueur
 * @see JOUEUR1
 * @see JOUEUR2
 * @see JOUEUR
 */
var changerJoueur = function() {
    if(JOUEUR == JOUEUR1)
        JOUEUR = JOUEUR2;
    else
        JOUEUR = JOUEUR1;

    $('.jeton').toggle();
};

var initialiserPlateau = function() {
    var grille = new Grille();
    $('#plateau').append(grille.dessine());
    $('#plateau').append('<img class="jeton img-responsive" id="jetonR" src="img/jetonR.png" style="display: block;">');
    $('#plateau').append('<img class="jeton img-responsive" id="jetonJ" src="img/jetonJ.png" style="display: none;">');
    $('#fleches').append(flecheDessine());
    JOUEUR = JOUEUR1;
};

/**
 * verifie si quatre jetons de même couleur sont alignés
 * @param numColonne
 * @param numLigne
 * @returns {boolean}
 */
var verifierGain = function (numColonne, numLigne) {
    var nbAligne = 1;
    var couleur = $('#case' + numColonne + '' + numLigne).data('joueur');  //couleur de la nouvelle case


    if(numLigne <= 2) {                                  //On regarde la colonne verticale
        for(var i = 1; i < 4; ++i) {
            if ($('#case' + numColonne + '' + (numLigne + i)).data('joueur') == couleur) {
                nbAligne += 1;
            }
            else
                break;
        }
        if(nbAligne == 4)
            return true;
    }
    nbAligne = 0;

    // On se prepare à regarder la diagonale de pente -1, on se place le plus en bas à droite possible

    for(var i = 0; i < 6; ++i) {
        if(numLigne + i == 5 || numColonne + i == 6) {
            var numLigneInter = numLigne + i;
            var numColonneInter = numColonne + i;

            for(var j = 0; j < 6; ++j) {                    // On regarde la diagonale de pente - 1
                if($('#case' + (numColonneInter - j) + '' + (numLigneInter - j)).data('joueur') == couleur) {
                    nbAligne += 1;
                    if (nbAligne == 4) {
                        return true;
                    }
                }
                else {
                    nbAligne = 0;
                }
            }
            break;
        }
    }
    nbAligne = 0;

    // On se prepare à regarder la diagonale de pente 1, on se place le plus en bas à guache possible

    for(var i = 0; i < 6; ++i) {
        if(numLigne + i == 5 || numColonne - i == 0) {
            var numLigneInter = numLigne + i;
            var numColonneInter = numColonne - i;

            for(var j = 0; j < 6; ++j) {                    // On regarde la diagonale de pente - 1
                if($('#case' + (numColonneInter + j) + '' + (numLigneInter - j)).data('joueur') == couleur) {
                    nbAligne += 1;
                    if (nbAligne == 4) {
                        return true;
                    }
                }
                else {
                    nbAligne = 0;
                }
            }
            break;
        }
    }
    nbAligne = 0;

    for(var i = 0; i < 7; ++i) {                            // On regarde la ligne horizontale
        if($('#case' + (i) + '' + numLigne).data('joueur') == couleur) {
            nbAligne += 1;
            if (nbAligne == 4) {
                return true;
            }
        }
        else {
            nbAligne = 0;
        }
    }
    return false;

}; //verifierGain()

/**
 * insert le pion du joueur courrant dans une colonne, puis appelle la fonction changerJoueur()
 * @param numColonne
 * @see changerJoueur()
 */
jouerColonne = function(numColonne) {
    if(colonnePleine(numColonne)) {
        alert('Cette colonne est déjà pleine');
        return;
    }
    for(var o = 1; o < 7; ++o){             // place le pion sur les autres pions de la colonne
        if($('#case' + numColonne + '' + o).css('background-color') == 'rgb(199, 247, 255)') {
            continue;
        }
        else {
            var couleur = '';
            if (JOUEUR == JOUEUR1) {
                couleur = 'red';
            } else {
                couleur = 'yellow';
            }
            if (couleur) {                  //tout le temps
                $('#case' + numColonne + '' + (o - 1))
                    .css('background-color', couleur)
                    .data('joueur', couleur);
                if(verifierGain(numColonne, o - 1)) {
                    alert('Le joueur ' + JOUEUR + ' (' + couleur + ') a gagné !');
                    refairePlateau();
                }
                if(tableauPlein()) {
                    alert('Egalité ...');
                }
                changerJoueur();
                break;
            }
        }
    }
}; // jouerColonne()

/**
 * vide les div de plateau et fleches pour réinitialiser le jeu
 */
var refairePlateau = function() {
    $('#plateau').empty();
    $('#fleches').empty();
    initialiserPlateau();
};

//######################################################

$(document).ready(function() {

    /**
     * annimation à la connection
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



    $('#message-btn-fermer').click(function(){
        $('#message').slideUp();
    });

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
                    $('#boutonCreerPartie').fadeIn();
                    $('#invitationConnexion').fadeOut();
                }
            },
            error: function() {
                alert('erreur');
            }
        });
        $(this).hide();
        return false;
    });

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
                    $('#boutonCreerPartie').fadeOut();
                    $('#boutonReset').fadeOut();
                    $('#plateau').empty();
                    $('#fleches').empty();
                    $('#invitationConnexion').fadeIn();
                }
            },
            error: function() {
                alert('erreur');
            }
        });
        $(this).hide();
        return false;
    });

    $('#boutonRegles').click(function() {
        $('#messageRegle').slideDown();
        $('#boutonRegles').fadeOut();
    });


    /**
     * effet sur le bouton fermer
     */
    $('#message-btn-fermerRegle').click(function(){
        $('#messageRegle').slideUp();
        $('#boutonRegles').fadeIn();
    });

    $('#boutonCreerPartie')
        .hide()
        .click(function(){
        $(this).slideUp();
        $('#jeu').slideDown();
        $('#boutonReset').fadeIn();
        initialiserPlateau();
    });

    $('#boutonReset').click(function() {
        refairePlateau();
    });
});