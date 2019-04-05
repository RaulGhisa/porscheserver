package ro.nullcombustionexception.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "marker")
public class Marker {

    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "native"
    )
    @GenericGenerator(
            name = "native",
            strategy = "native"
    )
    @Column(name = "marker_id")
    private long id;

    @Column(name = "hazard_type")
    private String hazardType;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHazardType() {
        return hazardType;
    }

    public void setHazardType(String hazardType) {
        this.hazardType = hazardType;
    }
}

