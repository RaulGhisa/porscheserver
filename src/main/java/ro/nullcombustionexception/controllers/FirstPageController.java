package ro.nullcombustionexception.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static com.sun.xml.internal.ws.spi.db.BindingContextFactory.LOGGER;

@Controller
@RequestMapping(value = "/first")
public class FirstPageController {

    public static class LoadParams {
//        public String p1;
//        public Long p2;
    }

    @RequestMapping(value = "/load", method = RequestMethod.POST)
    public
    @ResponseBody
    Map<String, Object> load() {
        LOGGER.info("First page loaded");
        System.out.println("First loaded");
        Map<String, Object> result = new HashMap<>();

//        List<ProtestTable.Protest> protests = new ArrayList<>();
//
//        protests = protestTable.selectAll();
//
//        result.put("protests", protests);

        result.put("somestring", "Maybe it works");
        return result;
    }
}
