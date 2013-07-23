package com.carles.dogphone_jersey_client.domain;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="botiga")
public class Botiga extends Entitat implements Serializable {

private String nom;
private String adressa;
private String telefon;
private double latitut;
private double longitut;
private String ciutat;

/*- ***************************************************************************** */
/*- ***** CONSTRUCTORS ***** */
/*- ***************************************************************************** */
public Botiga() {}

public Botiga(String nom, String adressa, String telefon, double latitut, double longitut, String ciutat) {
	super();
	this.nom = nom;
	this.adressa = adressa;
	this.telefon = telefon;
	this.latitut = latitut;
	this.longitut = longitut;
	this.ciutat = ciutat;
}

/*- ***************************************************************************** */
/*- ***** GETTERS I SETTERS***** */
/*- ***************************************************************************** */
public String getNom() {
	return nom;
}

public void setNom(String nom) {
	this.nom = nom;
}
public String getTelefon() {
	return telefon;
}
public String getAdressa() {
	return adressa;
}

public void setAdressa(String adressa) {
	this.adressa = adressa;
}

public void setTelefon(String telefon) {
	this.telefon = telefon;
}
public double getLatitut() {
	return latitut;
}
public void setLatitut(double latitut) {
	this.latitut = latitut;
}
public double getLongitut() {
	return longitut;
}
public void setLongitut(double longitut) {
	this.longitut = longitut;
}
public String getCiutat() {
	return ciutat;
}
public void setCiutat(String ciutat) {
	this.ciutat = ciutat;
}
}
