using Server.Repositories;
using Server.Endpoints;
using Server.Services;

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
builder.Services.AddScoped<IRecordService, RecordService>();

var app = builder.Build();

app.UseCors("AllowReactApp");
app.MapRecordEndpoints();
app.Run();