using Microsoft.EntityFrameworkCore.Migrations;

namespace PortalRandkowy.API.Migrations
{
    public partial class AddedLikeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    userLikesId = table.Column<int>(nullable: false),
                    UserIsLikedId = table.Column<int>(nullable: false),
                    UserLikesId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.userLikesId, x.UserIsLikedId });
                    table.ForeignKey(
                        name: "FK_Likes_Users_UserLikesId",
                        column: x => x.UserLikesId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Likes_Users_userLikesId",
                        column: x => x.userLikesId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_UserLikesId",
                table: "Likes",
                column: "UserLikesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Likes");
        }
    }
}
