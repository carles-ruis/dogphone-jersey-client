package com.carles.dogphone_jersey_client.web;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.carles.dogphone_jersey_client.domain.Botiga;
import com.carles.dogphone_jersey_client.domain.Terminal;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

@Controller
@RequestMapping("/resources")
public class ResourcesController extends BaseController {

private List<Botiga> botigues = new ArrayList<Botiga>();
private List<Terminal> terminals = new ArrayList<Terminal>();
private static final int TERMINALS_PER_PAGE = 4;
private int totalPages = 0;

private static final String RESOURCE = "http://localhost:8080/dogphone-jersey-service/";
private static final String PATH_BOTIGUES_GET_BY_NOM = "botigues/Canonge";
private static final String PATH_BOTIGUES_GET = "botigues";


/*- ***************************************************************************** */
/*- ***** INICIALITZACIONS ***** */
/*- ***************************************************************************** */
//@PostConstruct
//public void loadBotigues() {
//	Client client = Client.create();
//	WebResource webResource = client.resource(RESOURCE);
//	String response = webResource.path(PATH_BOTIGUES_GET).accept(MediaType.APPLICATION_JSON).get(String.class);
//	ClientResponse cr;
//	cr.
//	//	String response = webResource.path(PATH_BOTIGUES_GET_BY_NOM).accept(MediaType.APPLICATION_JSON).get(String.class);
////	Botiga response = webResource.path(PATH_BOTIGUES_GET_BY_NOM).accept(MediaType.APPLICATION_JSON).get(Botiga.class);
////	List<Botiga> response = webResource.path(PATH_BOTIGUES_GET).accept(MediaType.APPLICATION_JSON).get(List.class);
////	GenericEntity<List<Botiga>> response = webResource.path(PATH_BOTIGUES_GET).accept(MediaType.APPLICATION_JSON).get(GenericEntity.class);
//	
//	// if (response.getStatus() != 201) {
//	// throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
//	// } else {
//	// System.out.println(response.getEntity(String.class));
//	// }
//	// botigues = botigaRepo.find().asList();
//	// context.setAttribute("botigues", botigues);
//	System.out.println(response);
//}
//
//@PostConstruct
//public void loadTerminals() {
////	terminals = terminalRepo.find().asList();
////	totalPages = (int) Math.ceil(terminals.size() / TERMINALS_PER_PAGE);
////	context.setAttribute("totalPages", totalPages);
////	context.setAttribute("terminalsPerPage", TERMINALS_PER_PAGE);
////	context.setAttribute("terminals", terminals);
//}

/*- ***************************************************************************** */
/*- ***** REQUEST MAPPING ***** */
/*- ***************************************************************************** */
@RequestMapping(method = RequestMethod.GET, value="/botigues")
public @ResponseBody List<Botiga> getBotigues(HttpSession sessio){
	throw new UnsupportedOperationException();
}

@RequestMapping(method = RequestMethod.GET, value="/terminals")
public @ResponseBody List<Terminal> getTerminals(HttpSession sessio) {
	throw new UnsupportedOperationException();
}

//@RequestMapping(method = RequestMethod.GET, value="/botigues")
//public @ResponseBody List<Botiga> getBotigues(HttpSession sessio){
//	return (List<Botiga>) context.getAttribute("botigues");
//}
//
//@RequestMapping(method = RequestMethod.GET, value="/terminals")
//public @ResponseBody List<Terminal> getTerminals(HttpSession sessio) {
//	return (List<Terminal>) context.getAttribute("terminals");
//}
/*- ***************************************************************************** */
/*- ***** PRIVATE ***** */
/*- ***************************************************************************** */
private void ordenarBotiguesPerCiutat(List<Botiga> botigues) {
	Collections.sort(botigues, new Comparator<Botiga>() {
		@Override
		public int compare(Botiga o1, Botiga o2) {
			int compCiutats = o1.getCiutat().compareTo(o2.getCiutat());
			if (compCiutats != 0) {
				return compCiutats;
			} else {
				return o1.getNom().compareTo(o2.getNom());
			}
		}
	});
}
}
