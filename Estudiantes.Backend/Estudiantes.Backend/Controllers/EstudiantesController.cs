using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Estudiantes.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController(EstudiantesDbContext contexto) : ControllerBase
    {
        private readonly EstudiantesDbContext _context = contexto;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var estudiantes = await _context.estudiantes.ToListAsync();
            if (estudiantes.Any())
            {
                return Ok(new Response<IEnumerable<Estudiantes>>
                {
                    IsSuccess = true,
                    Result = estudiantes,
                    Message = "Listado de estudiantes"
                });
            }
            return Ok(new Response<IEnumerable<Estudiantes>>
            {
                IsSuccess = false,
                Result = [],
                Message = "No hay registros"
            });
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CrearActualizar model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<CrearActualizar>
                {
                    IsSuccess = false,
                    Result = model,
                    Message = "Los campos no son correctos"
                });
            }
            var estudianteNuevo = new Estudiantes
            {
                documento=model.documento,
                nombre = model.Nombre,
                apellidos = model.Apellidos,
                edad = model.Edad,
                genero=model.Genero,
                celular = model.Celular,
                correo = model.Correo,
                curso = model.Curso
            };
            await _context.estudiantes.AddAsync(estudianteNuevo);
            await _context.SaveChangesAsync();

            return Ok(new Response<Estudiantes>
            {
                IsSuccess = true,
                Result = estudianteNuevo,
                Message = "estudiante creado correctamente"
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id ==0)
            {
                return BadRequest(new Response<Estudiantes>
                {
                    IsSuccess = false,
                    Result = null,
                    Message = "El id es necesario"
                });
            }
            var estudiante = await GetEstudiante(id);
            if (estudiante != null)
            {
                return Ok(new Response<Estudiantes>
                {
                    IsSuccess = true,
                    Result = estudiante,
                    Message = "se encontro un estudiante"
                });
            }
            return NotFound(new Response<Estudiantes>
            {
                IsSuccess = false,
                Result = null,
                Message = "No hay conincidencias"

            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
            {
                return BadRequest(new Response<Estudiantes>
                {
                    IsSuccess = false,
                    Result = null,
                    Message = "El id es incorrecto"
                });
            }
            var estudiante = await GetEstudiante(id);
            if (estudiante != null)
            {
                _context.estudiantes.Remove(estudiante);
                await _context.SaveChangesAsync();

                return Ok(new Response<Estudiantes>
                {
                    IsSuccess = true,
                    Result = estudiante,
                    Message = $"se ha eliminado el estudiante {estudiante.nombre}"
                });
            }
            return NotFound(new Response<Estudiantes>
            {
                IsSuccess = true,
                Result = estudiante,
                Message = "No hay conincidencias"
            });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id,[FromBody] CrearActualizar model)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(new Response<CrearActualizar>
                {
                    IsSuccess = false,
                    Result = model,
                    Message = "El id es necesario"
                });
            }
            if (ModelState.IsValid)
            {
                var estudiante = await GetEstudiante(int.Parse(id));
                if (estudiante != null)
                {
                    estudiante.documento = model.documento;
                    estudiante.nombre = model.Nombre;
                    estudiante.apellidos = model.Apellidos;
                    estudiante.edad = model.Edad;
                    estudiante.celular = model.Celular;
                    estudiante.correo = model.Correo;
                    estudiante.curso = model.Curso;

                    _context.estudiantes.Update(estudiante);
                    await _context.SaveChangesAsync();

                }
                return Ok(
                    new Response<CrearActualizar>
                    {
                        IsSuccess = true,
                        Result = model,
                        Message = "Estudiante actualizadof"
                    });
            }
            return BadRequest(new Response<CrearActualizar>
            {
                IsSuccess = false,
                Result = model,
                Message = "No se pudo actualizar el registro"
            });
        }

        private async Task<Estudiantes> GetEstudiante(int id)
        {
            var estudiante = await _context.estudiantes.FirstOrDefaultAsync(x => x.id == id);
            return estudiante;
        }
    }

}
