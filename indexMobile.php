<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Puissance 4 Js</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
        <script src="http://code.jquery.com/jquery-1.4.5.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
        <style>
body {
    padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>
        <div data-role="page">
                <div data-role="header">
                    <!--[if lt IE 8]>
                        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
                    <![endif]-->
                <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                  <div class="container">
                    <div class="navbar-header">
                      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                      </button>
                      <a class="navbar-brand" href="#">Puissance 4</a>
                    </div>
                    <div id="navbar" class="navbar-collapse collapse">
                        <form id="form-login"
                            class="navbar-form navbar-right"
                            role="form" method="post"
                            action="json_login.php"
                            style="display: none">
                        <div class="form-group">
                          <input type="text" placeholder="Ident" class="form-control" id="id" name="id">
                        </div>
                        <div class="form-group">
                          <input type="password" placeholder="Password" class="form-control" id="password" name="password">
                        </div>
                        <button type="submit" class="btn ">Login</button>
                        </form>

                        <!--<button type="button" class="btn btn-success" id="bontonSign-in" style="margin-top: 7px;">Sign-in</button>

                        <form id="form-sign-in"
                              class="navbar-form navbar-right"
                              role="form" method="post"
                              action="json_sign-in.php"
                              style="display: none">
                            <div class="form-group">
                                <input type="text" placeholder="Ident" class="form-control" id="id" name="id">
                            </div>
                            <div class="form-group">
                                <input type="password" placeholder="Password" class="form-control" id="password" name="password">
                            </div>
                            <button type="submit" class="btn btn-success">Sign-in</button>
                        </form> -->

                        <button type="button" class="btn ui-btn ui-btn-inline" id="boutonRegles">Règles du jeu</button>
                        <form id="form-logout"
                            class="navbar-form navbar-right"
                            role="form"
                            method="post"
                            action="json_logout.php"
                            style="display: none">
                              <button class="btn btn-danger" type="submit" title="deconnection">Logout</button>
                        </form>
                    </div><!--/.navbar-collapse -->
                  </div>
                </nav>
            </div>

            <div class="ui-content">
                <!-- Main jumbotron for a primary marketing message or call to action -->
                <div class="jumbotron">
                  <div class="container">

                    <div id="messageRegle" class="row" style="display: none">
                        <div class="col-md-12">
                            <p1 id="message-contenu">Le but du jeu est d'aligner 4 pions. Chaque joueur dispose de pions d'une couleur.
            Tour à tour les deux joueurs placent un pion dans la colonne de leur choix, le pion coulisse alors jusqu'à
                                la position la plus basse possible dans la dite colonne, à la suite de quoi c'est à l'adversaire de jouer.
                                Le vainqueur est le joueur qui réalise le premier un alignement (horizontal, vertical ou diagonal) d'au moins
                                quatre pions de sa couleur. Si, alors que toutes les cases de la grille de jeu sont remplies, aucun des deux joueurs
                                n'a réalisé un tel alignement, la partie est déclarée nulle.</p1></br>
                            <button type="button" class="btn btnfermer ui-btn ui-icon-delete ui-btn-icon-right" id="message-btn-fermerRegle">Fermer</button>
                        </div>
                    </div>

                    <div id="message" class="row" style="display: none">
                        <div class="col-md-12">
                            <h1 id="message-contenu">On ne devrait pas voir ca</h1>
                            <button type="button" class="btn btnfermer btn-primary ui-btn" id="message-btn-fermer">Fermer</button>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary ui-btn" id="boutonCreerPartie">CREER UNE PARTIE</button>

                    <div id="jeu" style="display: none">
                        <button type="button" class="btn btn-warning ui-btn ui-icon-delete ui-btn-icon-right" id="boutonReset" >REINITIALISER</button>
                            <div id="fleches">

                            </div>
                            <div id="plateau">

                            </div>
                    </div>

                  </div>
                </div>
            </div>
            <div data-role="footer">
                <div class="container">

                <hr>

                  <footer>
                    <p>&copy; Company 2015</p>
                  </footer>
                </div> <!-- /container -->
                    <script src="js/vendor/jquery-1.11.2.min.js"></script>
                    <script src="js/vendor/bootstrap.min.js"></script>
                    <script src="js/main.js"></script>
            </div>
        </div> <!-- data-role="page" -->
    </body>
</html>
