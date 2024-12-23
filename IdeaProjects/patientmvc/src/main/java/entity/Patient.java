package entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity // Marque cette classe comme une entité JPA
@Data // Génère les getters, setters, toString, etc. grâce à Lombok
@AllArgsConstructor // Génère un constructeur avec tous les champs
@NoArgsConstructor  // Génère un constructeur sans arguments
public class Patient { // Nom de la classe avec une majuscule, par convention Java

    @Id // Marque cet attribut comme identifiant
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Génère automatiquement les IDs
    private Long id;

    private String name;
    private Date datedenaissance;
    private boolean malade;
    private int score;
}
