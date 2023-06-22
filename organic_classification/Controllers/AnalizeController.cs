using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using organic_classification.Model;
using organic_classification.Model.API;
using organic_classification.Model.Context; 
using organic_classification.Model.Image;
using Organic_classification;
using System.Reflection.Metadata.Ecma335;
using Tensorflow;
using Tensorflow.Contexts;

namespace organic_classification.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AnalizeController : Controller
    {
        private DbContextModel db = new DbContextModel(); 

        [HttpPost("importfile")]
        public string ImportFile([FromForm] IFormFile file)
        {
            string name = file.FileName;
            string extension = Path.GetExtension(file.FileName);

            string path = Path.Combine(Directory.GetCurrentDirectory(), "FileUpload"); 
            if(!Directory.Exists(path)) { Directory.CreateDirectory(path); }

            var filename = Guid.NewGuid().ToString() + extension;
            var filepath = Path.Combine(path, filename);
            //read the file
            using (var stream = new FileStream(filepath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return filename; 


        }

        [HttpPost("send")]
        public MLModel.ModelOutput Send(Analize form)
        {
            using (var trans = db.Database.BeginTransaction())
            {
               

                try
                {

                    string path = Path.Combine(Directory.GetCurrentDirectory(), "FileUpload");
                    var filepath = Path.Combine(path, form.filename);

                    var response = new List<string>();
                    //Load sample data
                    var imageBytes = System.IO.File.ReadAllBytes(filepath);
                    MLModel.ModelInput sampleData = new MLModel.ModelInput()
                    {
                        ImageSource = imageBytes,
                    };

                    //Load model and predict output
                    var result = MLModel.Predict(sampleData);

                    Images img = new Images();
                    img.name = form.filename;
                    img.n_score = result.Score[0].ToString();
                    img.o_score = result.Score[1].ToString();

                    var trained = Convert.ToDecimal(img.o_score) > 0 && Convert.ToDecimal(img.n_score) > 0 ? true : false;
                    img.label = trained ? result.PredictedLabel : "uncategorized";
                    img.trained = false;
                    db.images.Add(img);
                    db.SaveChanges();

                    MLModel.ModelOutput ouputresult = new MLModel.ModelOutput();
                    ouputresult.PredictedLabel = img.label;
                    ouputresult.Label = result.Label;
                    ouputresult.ImageSource = result.ImageSource;
                    ouputresult.Score = result.Score;

                    trans.Commit();

                    return ouputresult; 

                }
                catch (Exception ex)
                {
                    trans.Rollback();

                    return new MLModel.ModelOutput() {
                        PredictedLabel = ex.Message,
                        Label = 0,
                        ImageSource = null,
                        Score = null, 

                    }; 
                }

            }
              
        }

        [HttpGet("getfileuploaded")]
        public APIResponseObj GetFileUploaded()
        {

            try
            {
                APIResponseObj result = new APIResponseObj();
                string path = Path.Combine(Directory.GetCurrentDirectory(), "FileUpload");
                //string[] arrFiles = Directory.GetFiles(path, "*.jpg", SearchOption.TopDirectoryOnly);

                var datas = db.images.Where(s => s.trained == false).ToList();

                List<ImagesResult> resultdata = new List<ImagesResult>();
                foreach (var item in datas)
                {
                    ImagesResult data = new ImagesResult();
                    data.filepath = Path.Combine(path, item.name);
                    data.n_score = item.n_score;
                    data.o_score = item.o_score;
                    data.name = item.name;
                    data.id = item.id;
                    data.trained = item.trained; 
                    resultdata.Add(data);

                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                return new APIResponseObj()
                {
                    data = resultdata,
                    message = "Success get data",
                    status = true, 
                }; 

            }
            catch (Exception)
            {

                return new APIResponseObj(); 
            }

        }
    }
}
