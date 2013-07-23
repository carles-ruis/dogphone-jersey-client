package com.carles.dogphone_jersey_client.web;

import java.util.Locale;
import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

public abstract class BaseController {

@Autowired protected ServletContext context;
@Autowired protected MessageSource messageSource;

/*- ***************************************************************************** */
/*- ***** MODEL ATTRIBUTE ***** */
/*- ***************************************************************************** */

/*- ***************************************************************************** */
/*- ***** PROTECTED ***** */
/*- ***************************************************************************** */
/** Obte un missatge de l'arxiu de properties a partir de la seva clau */
protected String getMessage(String key, Locale locale) {
	return messageSource.getMessage(key, null, locale);
}

protected String getMessage(String key, Locale locale, String... args) {
	return messageSource.getMessage(key, args, null, locale);
}
/*- ***************************************************************************** */
/*- ***** GETTERS I SETTERS ***** */
/*- ***************************************************************************** */

}
