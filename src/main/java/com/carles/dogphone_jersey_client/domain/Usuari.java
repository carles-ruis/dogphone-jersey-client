package com.carles.dogphone_jersey_client.domain;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Usuari extends Entitat implements Serializable {

private String nom;
private String password;
transient private String confirmacio;

/*- ***************************************************************************** */
/*- ***** CONSTRUCTORS ***** */
/*- ***************************************************************************** */
public Usuari() {}

public Usuari(String nom, String password) {
	super();
	this.nom = nom;
	this.password = password;
}
/*- ***************************************************************************** */
/*- ***** OVERRIDE ***** */
/*- ***************************************************************************** */

/*- ***************************************************************************** */
/*- ***** GETTERS I SETTERS***** */
/*- ***************************************************************************** */
public String getNom() {
	return nom;
}
public void setNom(String nom) {
	this.nom = nom;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public String getConfirmacio() {
	return confirmacio;
}

public void setConfirmacio(String confirmacio) {
	this.confirmacio = confirmacio;
}

}
