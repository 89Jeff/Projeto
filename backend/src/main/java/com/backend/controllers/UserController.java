package com.backend.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.backend.dtos.UserDto;
import com.backend.models.User;
import com.backend.service.UserService;

@CrossOrigin("*")
@RestController
public class UserController {

    @Autowired
    private UserService userServices;

    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public List<User> listarUserUser() {
        return userServices.listarUser();
    }

    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    public User salvaUser(@RequestBody UserDto userDTO) {
        return userServices.salvaUser(userDTO);
    }
    

    @DeleteMapping("/user/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerUser(@PathVariable("id")  Long id) {
        userServices.removerUser(id);
    }

    @PutMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User atualizarUser(@PathVariable("id") Long id ,@RequestBody UserDto userDTO){
          return userServices.atualizarUser(id, userDTO);
    }

    @PostMapping("/user/confirmarlogin")
    public ResponseEntity<?> confirmarLogin(@RequestBody User loginUser) {
        Optional<User> user = userServices.confirmarLogin(loginUser.getEmail(), loginUser.getSenha());
        if (user.isPresent()) {
            return ResponseEntity.ok().body("Login bem-sucedido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }
    
}
    


