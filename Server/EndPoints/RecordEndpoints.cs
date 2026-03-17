using Server.Models;
using Server.Services;

namespace Server.Endpoints;

public static class RecordEndpoints
{
    public static void MapRecordEndpoints(this WebApplication app)
    {
        // Apply API Versioning via a Route Group
        var api = app.MapGroup("/api/v1/records");

        // GET: /api/v1/records
        app.MapGet("/api/v1/records", (IRecordService service) =>
        {
            return Results.Ok(service.GetAllRecords());
        });

        // PUT: /api/v1/records/{id}

        app.MapPut("/api/v1/records/{id}", (int id, RecordItem record, IRecordService service) =>
        {
            var updated = service.UpdateRecord(id, record);

            if (updated == null)
            {
                return Results.NotFound(new { message = "Record not found or validation failed" });
            }

            return Results.Ok(updated);
        });
    }
}