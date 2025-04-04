using Estudiantes.Backend;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var conexionstring = builder.Configuration.GetConnectionString("sql");
builder.Services.AddDbContext<EstudiantesDbContext>(op =>
{
    op.UseMySql( conexionstring, new MySqlServerVersion(new Version(8, 0, 23)));
});

builder.Services.AddCors(op => {
    op.AddPolicy("AllowAll", policy => {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
