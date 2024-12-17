var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:44450")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Configure Kestrel to listen on HTTPS (and optionally HTTP for redirection)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5050); // Change HTTP port
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.UseHttps("/Users/dillibabu/.aspnet/https/bookmyshowbackend.pfx", "Babu1811");
    });
});


var app = builder.Build();

// Configure middleware
app.UseCors();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// Enable HTTPS redirection (only if you're using HTTP as well)
app.UseHttpsRedirection();

// Map controllers
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();



// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container
// builder.Services.AddControllersWithViews();
// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(builder =>
//     {
//         builder.WithOrigins("http://localhost:44450") // React dev server
//                .AllowAnyHeader()
//                .AllowAnyMethod();
//     });
// });

// // Configure Kestrel to listen on HTTPS
// builder.WebHost.ConfigureKestrel(options =>
// {
//     options.ListenAnyIP(5050); // Change HTTP port
//     options.ListenAnyIP(5001, listenOptions =>
//     {
//         listenOptions.UseHttps("/Users/dillibabu/.aspnet/https/bookmyshowbackend.pfx", "Babu1811");
//     });
// });

// var app = builder.Build();

// // Middleware pipeline
// app.UseHttpsRedirection(); // Redirect HTTP to HTTPS
// app.UseStaticFiles(); // Serve static files (CSS, JS, etc.)
// app.UseCors(); // Enable CORS
// app.UseRouting();
// app.UseAuthorization();

// // Serve React static files manually
// if (!app.Environment.IsDevelopment())
// {
//     app.UseStaticFiles(); // Serve files from wwwroot
//     app.UseDefaultFiles(); // Use index.html as the default file
// }

// // API controllers
// app.MapControllers();

// // Fallback for React Router
// app.MapFallbackToFile("index.html"); // Map unhandled routes to React's index.html

// app.Run();
