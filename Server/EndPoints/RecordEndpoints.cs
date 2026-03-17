using Server.Models;
using Server.Repositories;

namespace Server.Endpoints;

public static class RecordEndpoints
{
    public static void MapRecordEndpoints(this WebApplication app)
    {
        // Apply API Versioning via a Route Group
        var api = app.MapGroup("/api/v1/records");

        // GET: /api/v1/records
        api.MapGet("/", (IRecordRepository repo) => 
        {
            return Results.Ok(repo.GetAll());
        });

        // PUT: /api/v1/records/{id}
        api.MapPut("/{id}", (int id, RecordItem updatedRecord, IRecordRepository repo) =>
        {
            var result = repo.Update(id, updatedRecord);
            
            if (result == null) return Results.NotFound();
            
            return Results.Ok(result);
        });
    }
}