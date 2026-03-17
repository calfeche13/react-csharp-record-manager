using Server.Repositories;
using Server.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddSingleton<IRecordRepository, RecordRepository>();

var app = builder.Build();

app.UseCors("AllowReactApp");
app.MapRecordEndpoints();
app.Run();