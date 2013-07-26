package com.carles.dogphone_jersey_client.main;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class Main_PropertiesToJson {

private static final String PATH = ".\\src\\main\\resources\\com\\carles\\dogphone_jersey_client\\main";
//private static final String PATH_LOCALES = ".\\src\\main\\webapp\\locales\\ca";
private static final String PATH_LOCALES = ".\\src\\main\\webapp\\locales";

/*- ***************************************************************************** */
/*- ***** MAIN ***** */
/*- ***************************************************************************** */
public static void main(String[] s) {
	try {

		String files[] = new File(PATH).list();
		for (String filename : files) {
			if (filename.startsWith("dogphone_") && filename.endsWith(".properties")) {
				String oldFile = PATH+"\\"+filename;
				String newPath = PATH_LOCALES+"\\"+filename.replace("dogphone_", "").replace("properties", "");
				String newFile = newPath+"\\messages.json";
				propertiesToJson(oldFile, newFile);
			}
		}

	} catch (IOException e) {
		e.printStackTrace();
	}
}

/*- ***************************************************************************** */
/*- ***** PRIVATE ***** */
/*- ***************************************************************************** */
private static void propertiesToJson(String oldFile, String newFile) throws IOException {
	BufferedReader br = null;
	BufferedWriter bw = null;
		
	try {
		br = new BufferedReader(new InputStreamReader(new FileInputStream(oldFile), "ISO-8859-1"));
		String linia;
		StringBuffer json = new StringBuffer("{");
		while ( (linia = br.readLine()) != null ) {
			if (linia.startsWith("#") || linia.trim().length()==0) {
				continue;
			}
			if (linia.contains("=")==false) {
				throw new PropertiesToJsonException("ERROR: "+oldFile+" : "+linia);
			}
		for (int i=0;i<linia.length();i++) {
			System.out.println(linia.charAt(i)+" "+linia.codePointAt(i));
		}
			String key = linia.split("=")[0];
			String value = linia.split("=")[1];
			json.append("\""+key+"\":\""+value+"\", ");
		}
		json.deleteCharAt(json.lastIndexOf(","));
		json.append("}");

		bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(newFile)), "UTF-8"));
		bw.write(json.toString());
	} finally {
		br.close();
		bw.close();
	}
}

static class PropertiesToJsonException extends RuntimeException {
	public PropertiesToJsonException() {super();}
	public PropertiesToJsonException(String msg) {super(msg);}
}
}
