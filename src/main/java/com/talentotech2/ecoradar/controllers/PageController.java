package com.talentotech2.ecoradar.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/contacto")
    public String contacto() {
        return "contacto";
    }

    @GetMapping("/formularioinfo")
    public String formularioinfo() {
        return "formularioinfo";
    }

    @GetMapping("/rankings")
    public String rankings() {
        return "rankings";
    }

    @GetMapping("/iniciarsesion")
    public String iniciarsesion() {
        return "iniciarsesion";
    }

    @GetMapping("/Registro")
    public String Registro() {
        return "Registro";
    }

    @GetMapping("/informacion")
    public String informacion() {
        return "informacion";
    }
    
    @GetMapping("/coming-soon")
    public String comingSoonPage() {
        return "coming-soon";
    }
}

