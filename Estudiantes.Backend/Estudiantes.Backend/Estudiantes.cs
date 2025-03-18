using System.ComponentModel.DataAnnotations;

namespace Estudiantes.Backend
{
    public class Estudiantes
    {
        public int id { get; set; }
        public string documento { get; set; }
        public string nombre { get; set; }
        public string apellidos { get; set; }
        public int edad { get; set; }
        public string genero { get; set; }
        public string celular { get; set; }
        public string correo { get; set; }
        public string curso { get; set; }
    }

    public class CrearActualizar
    {
        [Required(ErrorMessage = "El documento es obligatorio.")]
        public string documento { get; set; }


        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(50, ErrorMessage = "El nombre no puede tener más de 50 caracteres.")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Los apellidos son obligatorios.")]
        [StringLength(50, ErrorMessage = "Los apellidos no pueden tener más de 50 caracteres.")]
        public string Apellidos { get; set; }

        [Range(5, 100, ErrorMessage = "La edad debe estar entre 5 y 100 años.")]
        public int Edad { get; set; }

        [Required(ErrorMessage = "El género es obligatorio.")]
        [RegularExpression("^(Masculino|Femenino|Otro)$", ErrorMessage = "El género debe ser 'Masculino', 'Femenino' o 'Otro'.")]
        public string Genero { get; set; }

        [Required(ErrorMessage = "El celular es obligatorio.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "El número de celular debe tener 10 dígitos.")]
        public string Celular { get; set; }

        [Required(ErrorMessage = "El correo es obligatorio.")]
        [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
        public string Correo { get; set; }

        [Required(ErrorMessage = "El curso es obligatorio.")]
        [StringLength(100, ErrorMessage = "El curso no puede tener más de 100 caracteres.")]
        public string Curso { get; set; }
    }

}
