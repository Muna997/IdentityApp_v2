using API.Data;
using API.Extensions;
using API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Scalar.AspNetCore;
using System;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.AddApplicationServices();
builder.AddAuthentiocanServices();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins(builder.Configuration["JWT:ClientUrl"]);
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");


await InitializeContextAsync();
app.Run();


async Task InitializeContextAsync()
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;

    try
    {
        var context = scope.ServiceProvider.GetService<Context>();
        var userManager = scope.ServiceProvider.GetService<UserManager<AppUser>>();
        var roleManager = scope.ServiceProvider.GetService<RoleManager<AppRole>>();

        await ContextInitializer.InitializeAsync(context, userManager, roleManager);
    }
    catch(Exception ex)
    {
        var logger = services.GetService<ILogger<Program>>();
        logger.LogError(ex, "Error occured during application migration");
    }
}