package com.carles.dogphone_jersey_client.domain;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Terminal extends Entitat implements Serializable {

private String nom;
private String descripcio;
private String imatge;

/*- ***************************************************************************** */
/*- ***** CONSTRUCTORS ***** */
/*- ***************************************************************************** */
public Terminal() {}

public Terminal(String nom, String descripcio, String imatge) {
	super();
	this.nom = nom;
	this.descripcio = descripcio;
	this.imatge = imatge;
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
public String getDescripcio() {
	return descripcio;
}
public void setDescripcio(String descripcio) {
	this.descripcio = descripcio;
}
public String getImatge() {
	return imatge;
}
public void setImatge(String imatge) {
	this.imatge = imatge;
}

}
