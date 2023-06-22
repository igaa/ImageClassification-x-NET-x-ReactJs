﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using organic_classification.Model.Context;

#nullable disable

namespace organic_classification.Migrations
{
    [DbContext(typeof(DbContextModel))]
    [Migration("20230621063438_initialcreate")]
    partial class initialcreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("organic_classification.Model.Image.Images", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("label")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("n_score")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("o_score")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<bool>("trained")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.ToTable("images");
                });
#pragma warning restore 612, 618
        }
    }
}