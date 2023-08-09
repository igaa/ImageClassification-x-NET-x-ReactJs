using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace organic_classification.Migrations
{
    /// <inheritdoc />
    public partial class addcreatedatecolumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "created_date",
                table: "images",
                type: "datetime",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "created_date",
                table: "images");
        }
    }
}
