import React, { Component } from 'react';
import { Upload } from './Upload';

export class Home extends Component {
    static displayName = Home.name;
  render() {
      return (
      <div>
        <p>Welcome to trash sorting, image classification app built with:</p>
              <ul>
                  <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                  <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                  <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                  <li><a href='https://dotnet.microsoft.com/en-us/apps/machinelearning-ai/ml-dotnet/'>ML.NET</a> machine learning image classfication</li>
              </ul>
              <p class="text-justify font-weight-light">Aplikasi ini adalah hasil dari penelitian kami yang menggunakan teknologi Deep Learning dengan model ResNet-50 dan DNN (Deep Neural Network) untuk memilah sampah dengan akurasi yang tinggi. Kami bertujuan untuk menyediakan solusi cerdas dalam memilah sampah guna mendukung program daur ulang dan pelestarian lingkungan</p>
              <p class="text-justify font-weight-light">Dalam aplikasi ini, kami telah melatih model ResNet-50 yang mampu mengenali berbagai jenis sampah dengan presisi tinggi. Model ini mampu memproses gambar sampah yang Anda unggah dan memberikan hasil identifikasi yang akurat. Kami juga menggunakan DNN untuk melakukan klasifikasi dan pengelompokan sampah berdasarkan jenisnya.</p>
              <p class="text-justify font-weight-light">Halaman beranda ini menyajikan berbagai fitur yang dapat Anda gunakan:</p>
              <ul>
                  <li><strong>App:</strong> Anda dapat mengunggah gambar sampah melalui opsi ini. Aplikasi akan melakukan analisis menggunakan model ResNet-50 dan DNN untuk mengidentifikasi jenis sampah yang terdapat dalam gambar. <a href="/upload">Try here!</a></li>
                  <li><strong>Calibrate:</strong> Aplikasi ini juga menyediakan fitur calibrate digunakan untuk melihat history gambar yang sudah di upload. jika terdapat gambar yang belum tercategory terdapat fitur <strong>Request Training</strong> untuk mengklasifikasikan secara manual untuk beberapa gambar yang belum tercategory dalam data model, untuk dilakukan re-training model. <a href="/collect">Try here!</a></li>
              </ul>
              <p>@2023 <code>Universitas Kahuripan Kediri</code> - <code>Igga</code><strong> (Crocode) </strong></p>
      </div>
    );
  }
}
